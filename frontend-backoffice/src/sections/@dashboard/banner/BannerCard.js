import PropTypes from "prop-types";
// @mui
import { Card, CardHeader, Box } from "@mui/material";

// ----------------------------------------------------------------------

BannerCard.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BannerCard({ title, subheader, children, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {children}
      </Box>
    </Card>
  );
}
