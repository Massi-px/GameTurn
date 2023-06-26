import * as React from 'react';
import {Box, Button} from "@mui/material";
import background from '../assets/img/CONNEXION2.png'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import '../assets/css/lobby.css'
export default function Lobby () {
    return(
        <Box sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat:'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
             className='page'>
            <Box sx={{ display: 'flex', justifyContent:'flex-end', paddingTop:'32px', paddingRight:'64px'  }}> {/* Conteneur pour aligner le bouton à droite */}
                <Button sx={{bgcolor:'#ED4545', color:'white', borderRadius:'38px'}}>Connexion <ArrowCircleRightIcon /></Button>
            </Box>
        </Box>
    )
}