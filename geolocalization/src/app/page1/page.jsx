"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./page1.module.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Geolocalizacao() {
    const [localizacao, setLocalizacao] = useState(null);
    const mapaRef = useRef(null);

    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js";
        script.onload = () => {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = [pos.coords.longitude, pos.coords.latitude];
                setLocalizacao(coords);

                mapboxgl.accesToken = TOKEN;
                const map = new mapboxgl.Map({
                    container: mapaRef.current,
                    style: "mapbox://styles/mapbox/streets-v11",
                    center: coords,
                    zoom: 14,
                });
                new mapboxgl.Marker({ color: "#FF0000" })
                    .setLngLat(coords)
                    .setPopup(
                        new mapboxgl.Popup().setHTML(
                            "<strong>Você está aqui!</strong>"
                        )
                    )
                    .addTo(map);

            },
                () => alert("Erro ao obter localização")
            );
        };
        document.body.appendChild(script);

    }, []);

    return (
        <div className={styles.container}>
            <div ref={mapaRef} className={styles.mapa}>
                {localizacao && (
                    <div className={styles.info}>
                        <h2>Localização Atual</h2>
                        <p>Longitude: {localizacao[0].toFixed(2)}</p>
                        <p>Latitude: {localizacao[1].toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
