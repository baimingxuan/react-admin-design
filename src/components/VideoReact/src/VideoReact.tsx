import { type FC, useEffect, useRef } from 'react'
import videojs from 'video.js'
import type Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'

const VideoReact: FC = (props: any) => {
  const videoRef = useRef<ElRef>(null)
  const playerRef = useRef(null)
  const { options } = props

  useEffect(() => {
    // 确保Video.js播放器只初始化一次 (Make sure Video.js player is only initialized once)
    if (!playerRef.current) {
      // Video.js播放器需要在React 18严格模式下的组件中。(The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.)
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-big-play-centered')

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement)
      }

      // @ts-ignore
      playerRef.current = videojs(videoElement, options)

      // 你可以在 'else' 块中更新一个现有的播放器 (You could update an existing player in the `else` block here)
    } else {
      const player = playerRef.current as Player

      player.autoplay(options.autoplay)
      player.src(options.sources)
    }
  }, [options, videoRef])

  // 当函数组件卸载时，销毁Video.js播放器 (Dispose the Video.js player when the functional component unmounts)
  useEffect(() => {
    const player = playerRef.current! as Player

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  )
}

export default VideoReact
