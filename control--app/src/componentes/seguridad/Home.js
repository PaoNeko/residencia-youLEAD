import React, { useState } from 'react';
import style from '../Tool/Style';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import descarga from '../../assets/img/YouLEAD.jpg';

const Home = () => {
    return (
        <Container maxWidth="xs">
           <div style={style.paper}>
               <div>
                    <Typography component="div" variant="h5"  style={{  height: '35vh' }}>
                        <img src={descarga} style={{  height: '75vh' }}/>
                    </Typography>
                </div>
            </div>
            
        </Container>
    );
};

export default Home;