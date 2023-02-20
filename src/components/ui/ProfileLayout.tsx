import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { z } from "zod";
import PersonalProfile from "./PersonalProfile";
import PublicProfile from "./PublicProfile";

export const getPrivateProfileLayout = (page: ReactElement) => {
  return (
    <Container>
      <PersonalProfile>{page}</PersonalProfile>
    </Container>
  );
};

export const getPublicProfileLayout = (page: ReactElement) => {
  return (
    <Container>
      <PublicProfile>{page}</PublicProfile>
    </Container>
  );
};
