"use client"
import React from "react"
import { useState, useEffect } from "react"

interface MapComponentProps {
    address: string
}

const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
    const [mapUrl, setMapUrl] = useState("")

    useEffect(() => {
        const encodedAddress = encodeURIComponent(address)
        setMapUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyBobXH5V-HQlseQ2OxFvlz3bj5zFUmg3ok&q=${encodedAddress}`)
    }, [address])

    return (
        <div
            className="map-container"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px 0",
            }}
        >
            <iframe
                width="400"
                height="300"
                style={{ border: 0, borderRadius: "8px" }}
                loading="lazy"
                allowFullScreen
                src={mapUrl}
                title={`Mapa para ${address}`}
            ></iframe>
        </div>
    )
}

export default MapComponent
