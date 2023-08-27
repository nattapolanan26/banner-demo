import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
// @mui
import { Container, Typography } from "@mui/material";

// Third Party Imports
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBanner } from "../hooks/banner";
// sections
import { BannerAccordion, BannerCard } from "../sections/@dashboard/banner";

// ----------------------------------------------------------------------

const validFileExtensions = {
  file: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const MAX_FILE_SIZE = 409600;

const schema = yup.object().shape({
  file_billboard: yup.mixed().nullable(),
  file_medium_banner: yup.mixed().nullable(),
  file_large_rectangle: yup.mixed().nullable(),
});

const defaultValues = {
  file_billboard: null,
  file_medium_banner: null,
  file_large_rectangle: null,
};

export default function BannerPage() {
  // ** Hook
  const { getBanner } = useBanner();
  const [dataBanner, setDataBanner] = useState([]);

  const fetchAPI = async () => {
    await getBanner().then((res) => {
      setDataBanner(res.data);
    });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const methods = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { CreateBanner } = useBanner();

  const onSubmit = (data) => {
    CreateBanner(data);
  };

  return (
    <>
      <Helmet>
        <title> Banner Page </title>
      </Helmet>

      <Container>
        <BannerCard>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Setting Banner
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <BannerAccordion />
            </form>
          </FormProvider>
        </BannerCard>
      </Container>
    </>
  );
}
