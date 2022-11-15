import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  overflowX: "hidden",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function MultiActionAreaCard(country) {
  console.log(country);
  let currency;
  if (country.el.currencies) {
    currency = Object.keys(country.el.currencies);
  } else {
    currency = [""];
  }
  let languages;
  if (country.el.languages) {
    languages = Object.keys(country.el.languages);
  } else {
    languages = [""];
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card sx={{ maxWidth: 350 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={country.el.flags.png}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              align="center"
              component="div"
            >
              {country.el.name.common}
            </Typography>
            <Typography align="center" variant="h6" color="text.secondary">
              Population:{country.el.population}
            </Typography>
          </CardContent>
          <Typography align="center" variant="h6" color="text.secondary">
            Region:{country.el.region}
          </Typography>
          <Typography align="center" variant="h6" color="text.secondary">
            Capital:{country.el.capital ? country.el.capital[0] : " "}
          </Typography>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpen}>
            View More Details
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Native name : {country.el.name.common}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sub Region : {country.el.subregion ? country.el.subregion : ""}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Currency Name :{currency.length > 0 ? currency[0] : ""}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Language Names :
            {
              <ul>
                {languages.map((e, i) => {
                  return <li key={i}>{e}</li>;
                })}
              </ul>
            }
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Border Countries
            {country.el.borders ? (
              <ul>
                {country.el.borders.map((e, i) => {
                  return <li key={i}>{e}</li>;
                })}
              </ul>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
