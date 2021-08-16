import React, {useRef, useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Icon = React.forwardRef((props, ref) => {
  return <FontAwesomeIcon forwardedRef={ref} {...props}></FontAwesomeIcon>
});

export default Icon
