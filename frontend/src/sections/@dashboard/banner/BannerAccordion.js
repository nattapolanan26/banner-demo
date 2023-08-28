import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { MuiFileInput } from "mui-file-input";
import Box from "@mui/material/Box";
import { useFormContext } from "react-hook-form";
import { useBanner } from "src/hooks/banner";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [fileBillboard, setFileBillboard] = React.useState(null);
  const [fileMediumBanner, setFileMediumBanner] = React.useState(null);
  const [fileLargeRectangle, setFileLargeRectangle] = React.useState(null);
  const [dataBanner, setDataBanner] = React.useState({});
  const { GetBanner, DeleteBanner } = useBanner();

  React.useEffect(() => {
    GetBanner().then((res) => setDataBanner(res.data));
  }, []);

  const handleChangeFile = (newFile, name) => {
    if (newFile !== null) {
      checkImageDimension(newFile, name)
        .then((res) => {
          if (res) {
            if (name === "file_billboard") setFileBillboard(newFile);
            if (name === "file_medium_banner") setFileMediumBanner(newFile);
            if (name === "file_large_rectangle") setFileLargeRectangle(newFile);

            setValue(name, newFile);
            trigger(name);
            setFocus(name);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setValue(name, null);
      if (name === "file_billboard") setFileBillboard(null);
      if (name === "file_medium_banner") setFileMediumBanner(null);
      if (name === "file_large_rectangle") setFileLargeRectangle(null);
    }
  };

  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const deleteFileBanner = (file) => {
    DeleteBanner(file);
  };

  const {
    register,
    formState: { errors },
    setError,
    setValue,
    setFocus,
    trigger,
    watch,
  } = useFormContext();

  const fb = watch("file_billboard");
  const flr = watch("file_large_rectangle");
  const fmb = watch("file_medium_banner");

  const checkImageDimension = (file, name) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", (event) => {
        const _loadedImageUrl = event.target?.result;
        const image = document.createElement("img");
        image.src = _loadedImageUrl;

        image.addEventListener("load", () => {
          const { width, height } = image;

          const FILE_BB_IMAGE_MAX_WIDTH = 970;
          const FILE_BB_IMAGE_MAX_HEIGHT = 250;

          if (name === "file_billboard") {
            if (
              width !== FILE_BB_IMAGE_MAX_WIDTH ||
              height !== FILE_BB_IMAGE_MAX_HEIGHT
            ) {
              resetField(name);
              resolve(false);
            }
          }

          const FILE_MB_IMAGE_MAX_WIDTH = 300;
          const FILE_MB_IMAGE_MAX_HEIGHT = 250;

          if (name === "file_medium_banner") {
            if (
              width !== FILE_MB_IMAGE_MAX_WIDTH ||
              height !== FILE_MB_IMAGE_MAX_HEIGHT
            ) {
              resetField(name);
              resolve(false);
            }
          }

          const FILE_LR_IMAGE_MAX_WIDTH = 336;
          const FILE_LR_IMAGE_MAX_HEIGHT = 280;

          if (name === "file_large_rectangle") {
            if (
              width !== FILE_LR_IMAGE_MAX_WIDTH ||
              height !== FILE_LR_IMAGE_MAX_HEIGHT
            ) {
              resetField(name);
              resolve(false);
            }
          }
          resolve(true);
        });
      });
    });
  };

  function resetField(name) {
    setValue(name, null);
    setError(name, { type: "custom", message: "Please check width & height" });
    setFocus(name);
  }

  return (
    <>
      <div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Chip label="Billboard" />
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography
                variant="body1"
                color="#637381"
                mt={"2rem"}
                mb={"4px"}
              >
                File Billboard
                <Typography color="error" component="span" pl={1}>
                  (970 x 250)
                </Typography>
              </Typography>
              <MuiFileInput
                ref={register("file_billboard").ref}
                name={register("file_billboard").name}
                onChange={(e) => handleChangeFile(e, "file_billboard")}
                value={fileBillboard}
                inputProps={{ accept: "image/*" }}
                placeholder="Upload file please"
                helperText={
                  errors.file_billboard ? errors.file_billboard.message : null
                }
                error={!!errors.file_billboard}
              />
              <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
                {fileBillboard ? (
                  <img
                    width="970px"
                    height="250px"
                    style={{ borderRadius: "10px" }}
                    src={URL.createObjectURL(fileBillboard)}
                    alt="create_banner_img"
                  />
                ) : null}
                {!fileBillboard && dataBanner.file_billboard ? (
                  <Box component="div" display="flex" flexDirection="column">
                    <Box sx={{ width: "100%", display: "inline-flex", mb: 4 }}>
                      <Typography pr={1} alignSelf="center">
                        {dataBanner.file_billboard}
                      </Typography>
                      <Button
                        type="submit"
                        autoFocus
                        variant="contained"
                        color="error"
                        onClick={() => deleteFileBanner("billboard")}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <img
                        width="970px"
                        height="250px"
                        style={{ borderRadius: "10px" }}
                        src={`${process.env.REACT_APP_ENDPOINT_BACKEND}/images/${dataBanner.file_billboard}`}
                        alt="edit_banner_img"
                      />
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Chip label="Medium Banner" />
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography
                variant="body1"
                color="#637381"
                mt={"2rem"}
                mb={"4px"}
              >
                File Medium Banner
                <Typography color="error" component="span" pl={1}>
                  (300 x 250)
                </Typography>
              </Typography>
              <MuiFileInput
                ref={register("file_medium_banner").ref}
                name={register("file_medium_banner").name}
                onChange={(e) => handleChangeFile(e, "file_medium_banner")}
                value={fileMediumBanner}
                inputProps={{ accept: "image/*" }}
                placeholder="Upload file please"
                helperText={
                  errors.file_medium_banner
                    ? errors.file_medium_banner.message
                    : null
                }
                error={!!errors.file_medium_banner}
              />
              <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
                {fileMediumBanner ? (
                  <img
                    width="300px"
                    height="250px"
                    style={{ borderRadius: "10px" }}
                    src={URL.createObjectURL(fileMediumBanner)}
                    alt="create_banner_img"
                  />
                ) : null}
                {!fileMediumBanner && dataBanner.file_medium_banner ? (
                  <Box component="div" display="flex" flexDirection="column">
                    <Box sx={{ width: "100%", display: "inline-flex", mb: 4 }}>
                      <Typography pr={1} alignSelf="center">
                        {dataBanner.file_medium_banner}
                      </Typography>
                      <Button
                        type="submit"
                        autoFocus
                        variant="contained"
                        color="error"
                        onClick={() => deleteFileBanner("medium_banner")}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <img
                        width="300px"
                        height="250px"
                        style={{ borderRadius: "10px" }}
                        src={`${process.env.REACT_APP_ENDPOINT_BACKEND}/images/${dataBanner.file_medium_banner}`}
                        alt="edit_banner_img"
                      />
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Chip label="Large Rectangle" />
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography
                variant="body1"
                color="#637381"
                mt={"2rem"}
                mb={"4px"}
              >
                File Large Rectangle
                <Typography color="error" component="span" pl={1}>
                  (336 x 280)
                </Typography>
              </Typography>
              <MuiFileInput
                ref={register("file_large_rectangle").ref}
                name={register("file_large_rectangle").name}
                onChange={(e) => handleChangeFile(e, "file_large_rectangle")}
                value={fileLargeRectangle}
                inputProps={{ accept: "image/*" }}
                placeholder="Upload file please"
                helperText={
                  errors.file_large_rectangle
                    ? errors.file_large_rectangle.message
                    : null
                }
                error={!!errors.file_large_rectangle}
              />
              <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
                {fileLargeRectangle ? (
                  <img
                    width="336px"
                    height="280px"
                    style={{ borderRadius: "10px" }}
                    src={URL.createObjectURL(fileLargeRectangle)}
                    alt="create_banner_img"
                  />
                ) : null}
                {!fileLargeRectangle && dataBanner.file_large_rectangle ? (
                  <Box component="div" display="flex" flexDirection="column">
                    <Box sx={{ width: "100%", display: "inline-flex", mb: 4 }}>
                      <Typography pr={1} alignSelf="center">
                        {dataBanner.file_large_rectangle}
                      </Typography>
                      <Button
                        type="submit"
                        autoFocus
                        variant="contained"
                        color="error"
                        onClick={() => deleteFileBanner("large_rectangle")}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <img
                        width="336px"
                        height="280px"
                        style={{ borderRadius: "10px" }}
                        src={`${process.env.REACT_APP_ENDPOINT_BACKEND}/images/${dataBanner.file_large_rectangle}`}
                        alt="edit_banner_img"
                      />
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <Box my={4}>
        <Button
          type="submit"
          autoFocus
          variant="contained"
          color="primary"
          disabled={!fb && !flr && !fmb}
        >
          Save Change
        </Button>
      </Box>
    </>
  );
}
