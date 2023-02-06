import Card from "@/components/Card";
import React from "react";
import { Container, Grid, Typography } from "@mui/material";

const Profile: React.FC = () => {
  return (
    <Container>
      profile page!
      <Typography variant='h1' component='h2' fontWeight={700}>
        Mes posts
      </Typography>
      <Grid container spacing={4}>
        {[...Array(9).keys()].map(e => (
          <Grid key={e} item xs={12} sm={6} lg={4}>
            <Card></Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Profile;
