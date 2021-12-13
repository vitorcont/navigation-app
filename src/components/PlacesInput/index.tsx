import React, { useEffect, useRef } from "react"
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import theme from "../../theme";

interface LocationProps {
  lat: number,
  lng: number
}

interface IProps {
  setLocation: (arg0: LocationProps) => void,
  setAddressText: (arg0: string) => void,
}

const PlacesInput = ({ setLocation, setAddressText }: IProps) => {
  const { GOOGLE_MAPS_APIKEY } = process.env
  const searchRef = useRef<GooglePlacesAutocompleteRef | null>(null);

  return (
    <GooglePlacesAutocomplete
      ref={searchRef}
      placeholder='Para onde vamos...'
      minLength={2}
      onPress={(data, details = null) => {
        if (searchRef && searchRef.current && details) {
          searchRef.current.setAddressText(data.description);
          setAddressText(data.description);
          setLocation(details.geometry.location)
        }
      }}
      fetchDetails={true}
      query={{
        key: GOOGLE_MAPS_APIKEY as string,
        language: 'pt-br',
      }}
      styles={{

        container: {
          width: '85%',
          alignItems: "center",
          alignSelf: 'center'
        },
        textInputContainer: {
          elevation: 10,
          alignSelf: 'center',
        },
        textInput: {
          height: 55,
          backgroundColor: theme.colors.input.lightest_gray,
          borderWidth: 1,
          borderRadius: 12,
          borderColor: theme.colors.input.light_gray,
          padding: 20,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
  )
}

export default PlacesInput;