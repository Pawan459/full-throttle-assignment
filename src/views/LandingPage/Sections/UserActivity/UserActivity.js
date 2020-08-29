import React, {useState, useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import profile from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import UserChart from './UserChart.js';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const  { userName, activityPeriod } = props;
  const [appointments, setAppointments] = useState([]);

  useEffect(()=> {
    const formatAppointment = [];
    console.log('activity Period', activityPeriod);
    if(!activityPeriod) return;
    activityPeriod.forEach((activity, index) => {
      const startDate = new Date(formatDate(activity.start_time));
      const endDate = new Date(formatDate(activity.end_time));
      const currObject = {
        title: 'User Active Records',
        startDate: startDate,
        endDate: endDate,
        id: index,
        location: 'Full Throttle Labs',
      }
      formatAppointment.push(currObject);
    })
    console.log(formatAppointment);
    setAppointments(formatAppointment);
  }, [activityPeriod])

  const formatDate = (currDate) => {
    const date = currDate.substr(0, currDate.length - 7).trim();
    const time =  currDate.substr(-7).trim();

    const hourFormat = convertTime12to24(time);

    return date +" " + hourFormat;
  }

  const convertTime12to24 = (time12h) => {
    const time = time12h.substr(0, time12h.length - 2);
    const modifier = time12h.substr(-2);
    console.log('time', time, 'modifier', modifier)

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }


  return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={8} sm={8} md={4}>
                <div className={classes.profile} style = {{marginTop: "150px"}}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{userName}</h3>
                    <h6>Full Throttle Employee</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              {appointments.length > 0 && <UserChart appointments = {appointments}/>}
            </GridItem>
          </GridContainer>
          </div>
        </div>
      </div>
  );
}
