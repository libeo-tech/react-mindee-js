import heic2any from 'heic2any'
import Konva from 'konva'
import UTIF from 'utif'

import { ImageData } from '@/common/types'

import { Stage } from '..'
import { ImageBoundingBox, PointerPosition } from './../common/types'

export const dataURItoBlob = (dataURI: string) => {
  let byteString
  const splitDataURL = dataURI.split(',')
  if (splitDataURL[0].indexOf('base64') >= 0) {
    // atob decodes base64 data
    byteString = atob(splitDataURL[1])
  } else {
    byteString = decodeURI(dataURI.split(',')[1])
  }

  const mimeString = splitDataURL[0].split(':')[1].split(';')[0]

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}

export const prepareImage = async (image: string) => {
  const blob = await urlToBlob(image)
  if (blob.type === 'image/heic') {
    return await heicToJpg(blob)
  }
  if (blob.type === 'image/tiff') {
    return await tiffToJpg(blob)
  }
  return image
}

export const urlToBlob = async (url: string) =>
  await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
  }).then((r) => r.blob())

export const tiffToJpg = async (blob: Blob) => {
  const arrayBuffer = await blob.arrayBuffer()
  const ifds = UTIF.decode(arrayBuffer)
  const firstPageOfTif = ifds[0]
  UTIF.decodeImage(arrayBuffer, firstPageOfTif)
  const rgba = UTIF.toRGBA8(firstPageOfTif)

  const imageWidth = firstPageOfTif.width
  const imageHeight = firstPageOfTif.height

  const cnv = document.createElement('canvas')
  cnv.width = imageWidth
  cnv.height = imageHeight

  const ctx = cnv.getContext('2d')!
  const imageData = ctx.createImageData(imageWidth, imageHeight)
  for (let i = 0; i < rgba.length; i++) {
    imageData.data[i] = rgba[i]
  }
  ctx.putImageData(imageData, 0, 0)
  return new Promise<string>((resolve, reject) => {
    cnv.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob))
      } else {
        reject('Error getting Blob')
      }
    })
  })
}

export const heicToJpg = async (blob: Blob) => {
  const result = await heic2any({ blob })
  return URL.createObjectURL(result as Blob)
}

export const computeImageBoundingBox = (
  { clientWidth, clientHeight }: HTMLDivElement,
  imageObj: HTMLImageElement,
  isFullWidth: boolean,
) => {
  const imageAspectRatio = imageObj.width / imageObj.height
  const canvasAspectRatio = clientWidth / clientHeight
  let renderableHeight, renderableWidth, xStart, yStart

  xStart = 0
  yStart = 0
  renderableHeight = clientHeight
  renderableWidth = clientWidth

  console.log('JGROUD computeImageBoundingBox', {
    imageWidth: imageObj.width,
    imageHeight: imageObj.height,
    imageAspectRatio,
    clientWidth,
    clientHeight,
    canvasAspectRatio,
  })

  if (isFullWidth) {
    console.log('JGROUD Final size', {
      scale: Number(Number(renderableWidth / imageObj.width).toFixed(3)),
      width: Math.round(clientWidth),
      height: Math.round(clientWidth / imageAspectRatio),
    })
    return {
      scale: Number(Number(renderableWidth / imageObj.width).toFixed(3)),
      x: xStart,
      y: yStart,
      width: Math.round(clientWidth),
      height: Math.round(clientWidth / imageAspectRatio),
    }
  } else {
    if (imageAspectRatio < canvasAspectRatio) {
      renderableWidth = imageObj.width * (renderableHeight / imageObj.height)
      xStart = Math.round((clientWidth - renderableWidth) / 2)
    } else if (imageAspectRatio > canvasAspectRatio) {
      renderableHeight = imageObj.height * (renderableWidth / imageObj.width)
      yStart = Math.round((clientHeight - renderableHeight) / 2)
    }

    return {
      scale: Number(Number(renderableWidth / imageObj.width).toFixed(3)),
      x: xStart,
      y: yStart,
      width: Math.round(renderableWidth),
      height: Math.round(renderableHeight),
    }
  }
}

const resizeStage = (stage: Konva.Stage, container: HTMLDivElement) => {
  console.log('JGROUD resizeStage', {
    width: container.clientWidth,
    height: container.clientHeight,
  })
  stage.width(container.clientWidth)
  stage.height(container.clientHeight)
}

export const handleResizeImage = (
  stage: Konva.Stage | null,
  container: HTMLDivElement | null,
  { element, shape }: ImageData,
  isFullWidth: boolean,
) => {
  if (!container || !stage) {
    return
  }
  resizeStage(stage, container)
  const imageBoundingBox = computeImageBoundingBox(
    container,
    element,
    isFullWidth,
  )
  const { x, y, width, height, scale } = imageBoundingBox
  stage?.scale({
    x: scale,
    y: scale,
  })
  stage.setAttr('zoomScale', 1)
  stage.position({ x, y })
  shape.width(width / scale)
  shape.height(height / scale)
  return imageBoundingBox
}

export const setStageBasedImagePosition = ({
  imageBoundingBox,
  stage,
  newPosition,
}: {
  imageBoundingBox: ImageBoundingBox
  stage: Stage
  newPosition: PointerPosition
}) => {
  const { x, y, width, height } = imageBoundingBox
  const zoomScale = stage.getAttr('zoomScale')
  let stageX = stage.x()
  let stageY = stage.y()
  const { x: newStageX, y: newStageY } = newPosition

  if (
    (newStageX < x * zoomScale || newStageX < stageX) &&
    (newStageX > stage.width() - (width + x) * zoomScale || newStageX > stageX)
  ) {
    stageX = newStageX
  }
  if (
    (newStageY < y * zoomScale || newStageY < stageY) &&
    (newStageY > stage.height() - (height + y) * zoomScale ||
      newStageY > stageY)
  ) {
    stageY = newStageY
  }
  console.log('JGROUD setStageBasedImagePosition', {
    width: stage.width(),
    height: stage.height(),
    zoomScale,
    stageX,
    stageY,
  })
  stage.position({
    x: stageX,
    y: stageY,
  })
  stage.batchDraw()
}
