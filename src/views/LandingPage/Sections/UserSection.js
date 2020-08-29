import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Dialog from "components/Dialog/Dialog.js"

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import femalePic from "assets/img/faces/avatar.jpg";
import malePic from "assets/img/faces/christian.jpg";

import { data } from 'staticData/staticData.js';
import UserActivity from "./UserActivity/UserActivity";

const useStyles = makeStyles(styles);

export default function UserSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const [activityPeriod, setActivityPeriod] = useState(undefined);
  const [currUserName, setCurrentUserName] = useState(null);
  const [open, setOpen] = useState(false);

  const { members } = data;

  const handleCardClick = (user) => {
    setCurrentUserName(user.real_name);
    setActivityPeriod(user.activity_periods);
    setOpen(true);
  }

  const renderUserCard = (user, index) => {
    return (<GridItem key={index} xs={12} sm={12} md={4}>
      <Card className={"cursor"} onClick = {(event) => handleCardClick(user)}>
      <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
        <img src={index%2 === 0 ? femalePic : malePic} alt="..." className={imageClasses} />
      </GridItem>
      <h4 className={classes.cardTitle}>
        {user.real_name}
                <br />
        <small className={classes.smallTitle}>Timezone: {user.tz}</small>
      </h4>
      <CardBody>
        <p className={classes.description}>
          You can write here details about one of your employee. You
          can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </p>
      </CardBody>
      <CardFooter className={classes.justifyCenter}>
        <Button
          justIcon
          color="transparent"
          className={classes.margin5}
        >
          <i className={classes.socials + " fab fa-twitter"} />
        </Button>
        <Button
          justIcon
          color="transparent"
          className={classes.margin5}
        >
          <i className={classes.socials + " fab fa-instagram"} />
        </Button>
        <Button
          justIcon
          color="transparent"
          className={classes.margin5}
        >
          <i className={classes.socials + " fab fa-facebook"} />
        </Button>
      </CardFooter>
    </Card> 
    </GridItem>)
  }

  const handleClose = (event) => {
    setOpen(false);
    setActivityPeriod(undefined);
  }

  return (
    <div className={classes.section}>
      <Dialog heading = {`${currUserName} Activity Details`} open = {open} handleClose = {handleClose}>
        {activityPeriod && <UserActivity userName = {currUserName} activityPeriod = {activityPeriod}/>}
      </Dialog>
      <h2 className={classes.title}>Full Throttle Labs User Activity</h2>
      <div>
        <GridContainer>
            {members && members.map((user, index) => {
              return renderUserCard(user, index);
            })}
        </GridContainer>
      </div>
    </div>
  );
}
