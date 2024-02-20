'use client'
import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import positions from '../data'

const Pipeline = () => {
  const mapRef = useRef(null)

  // useEffect(() => {
  //   const initMap = async () => {
  //     const loader = new Loader({
  //       apiKey: 'AIzaSyByK1YZa3VvBPy0ABd3xbymZtXbxs_i6aU',
  //       version: 'weekly',
  //       libraries: ['places'],
  //     })

  //     await loader.load() // Load necessary libraries

  //     const { Map } = await loader.importLibrary('maps')
  //     const { Marker } = await loader.importLibrary('marker')

  //     const currentPosition = {
  //       lat: 43.642693,
  //       lng: -79.3871189,
  //     }

  //     const mapOptions = {
  //       center: currentPosition,
  //       zoom: 2, // Corrected typo from 'zoon' to 'zoom'
  //     }

  //     const map = new Map(mapRef.current, mapOptions)

  //     // Add markers based on imported coordinates array
  //     positions.forEach((coord) => {
  //       if (coord.category === 'pipeline') {
  //         new google.maps.Marker({
  //           position: {
  //             lat: coord.coordinates.lat,
  //             lng: coord.coordinates.lng,
  //           },
  //           map: map,
  //         })
  //       }
  //     })
  //   }

  //   initMap()
  // }, [])

  return (
    <div style={{ position: 'relative', height: '600px', width: '100%' }}>
      <iframe className="w-full h-full" src="http://191.dinamix.tech/map/pipe_line/index.php" />
      {/* <div
        style={{
          position: 'absolute',
          top: 30,
          left: 40,
          padding: '1rem',
          background: '#800E80',
          zIndex: 2,
          borderRadius: '5px',
          width: '94%',
        }}
      >
        <div className="flex text-white items-center gap-2">
          <h1 className="text-lg font-bold">Maps - </h1>
          <span className="text-sm font-light">Pipeline</span>
        </div>
      </div>
      <div style={{ height: '600px' }} ref={mapRef} id="YOUR_HTML_ID" /> */}
    </div>
  )
}

export default Pipeline
