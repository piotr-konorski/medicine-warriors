import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import {useGoogleMap} from "@react-google-maps/api";
import React, {useEffect, useRef} from "react";

const LocationButton = ({localizeMe}) => {
    const map = useGoogleMap();
    const ref = useRef();
    useEffect(() => {
        if (map && ref) {
            map.controls[window.google.maps.ControlPosition["RIGHT_BOTTOM"]].push(
                ref.current
            );
        }
    }, [map, ref]);

    return <div ref={ref} id="geolocationButton" onClick={() => localizeMe(map)}>
        <FontAwesomeIcon icon={faLocationArrow} size="xl" />
    </div>;
};

export default LocationButton;