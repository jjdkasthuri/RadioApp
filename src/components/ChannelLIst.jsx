import { useState, useEffect } from 'react'
import $ from 'jquery'
import { Howl } from 'howler';
import channels from '../assets/channelsData';
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'

const ChannelLIst = () => {
  const [playing, setPlaying] = useState(false)
  const [event, setEvent] = useState(undefined)
  const [sound, setSound] = useState()
  const [channelName, setChannelName] = useState(undefined)

  const playClick = (_event) => {

    const channel = _event.target.id;
    setChannelName(channel)
    //console.log('id: ', channel)
    if(sound!=undefined){
        sound.pause()
        sound.unload()
    }
    setEvent(_event);

    if($(_event.target).text()=='▶️'){
        setPlaying(true)
        //console.log("start")
    }

    if($(_event.target).text()==='⏹️'){
        setPlaying(false)
        if(sound!=undefined){
          sound.pause()
        }
        $(_event.target).text('▶️')
        //console.log("pause")
    }
 
    const sound_ = new Howl({
      src: [import.meta.env[`VITE_${channel}_URI`]],
      html5: true,
    });

    setSound(sound_)
    sound_.unload()
  }

  const stopClick = async () => {
    console.log("SLBC_P clicked")
    console.log('sound: ', sound)
    sound.pause()
    setPlaying(false)
  }

  const startClick = async () => {
    sound.play()
    setPlaying(true)
    $(`#${channelName}`).text('⏹️')
  }

  useEffect(() => {
    if(sound!=undefined){
        if(playing){
            sound.play()
            //console.log("start")
        }
    }
  }, [sound])

  useEffect(() => {
    if(!playing){
      $('button').text('▶️')
  }
  }, [playing])
  
  useEffect(() => {
    if(playing && (event!=undefined)){
        $('button').text('▶️')
        $(event.target).text('⏹️')
    }
  }, [event])
  

  return (
    <>
      <div className='flex flex-wrap items-center justify-center max-w-screen min-h-screen bg-blue-0 m-[20px]'>

        {
          channels.map((channel, index) => {
            return(
              <div key={index} className='relative flex items-center justify-center sm:w-[300px] sm:h-[300px] w-[100px] h-[100px] bg-blue-0 border-[2px] border-slate-600 m-[5px]'>
                <img src={channel.img} alt="" className='w-full' />
                <button onClick={playClick} id={channel.name} className='absolute px-[2px] py-[2px] bg-slate-0 text-2xl z-[100]'>▶️</button>
              </div>
            )
          })
        }

        {
          (sound!=undefined) && (   
          <div className='fixed items-center justify-center bg-black w-screen sm:h-[80px] h-[50px] bottom-0 z-[100]'>

                <div className='flex bg-blue-0 items-center justify-center w-full h-full bg-blue-0'>
                  {
                    (playing) && (
                      <div className='flex items-center justify-center bg-blue-0 w-full'>
                        <p className='text-center text-[30px] text-white bg-green-0 w-1/2'>{channelName}</p>
                        <FaPause className='text-white sm:text-[50px] text-[35px] bg-blue-0 w-1/2' onClick={stopClick}/>
                      </div>
                    )     
                  }

                  {
                    (!playing) && (
                      <div className='flex items-center justify-center bg-blue-0 w-full'>
                        <p className='text-center text-[30px] text-white bg-green-0 w-1/2'>{channelName}</p>
                        <FaPlay className='text-white sm:text-[50px] text-[35px] bg-blue-0 w-1/2' onClick={startClick}/>
                      </div>
                    ) 
                  }
                  
                </div>


                

          </div>
          )
        }
    
      </div>
      <br></br>
      <h5>  &COPY; Copyright 2024 - LUMINOUSWEB Solutions <b>RadioApp</b></h5>
      


    </>
  )
}

export default ChannelLIst