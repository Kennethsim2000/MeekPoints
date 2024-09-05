import Link from "next/link";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "@mui/material/Button";
import { TaskCompleted } from "./profile";
import { useState } from "react";

type PropType = {
  completedTasksUser: TaskCompleted[];
  totalPoints: number;
  partner: string;
  user: string;
};

export default function PointCardComponent(props: PropType) {
  const [activeTab, setActiveTab] = useState<string>("#Total");
  const [pointsWeek, setPointsWeek] = useState<number>(0);
  const [pointsMonth, setPointsMonth] = useState<number>(0);

  const handleSelect = (e: any) => {
    setActiveTab(e);
    if (e === "#Week") {
      fetchCompletedByWeek(); // Fetch weekly data if the Week tab is clicked
    } else if (e === "#Month") {
      fetchCompletedByMonth();
    }
  };

  const renderCardBody = () => {
    switch (activeTab) {
      case "#Total":
        return (
          <>
            <Card.Title>Total Points earned</Card.Title>
            <Card.Text>{props.totalPoints} points completed</Card.Text>
            <Link href={props.partner}>
              <Button>Visit Partner</Button>
            </Link>
          </>
        );
      case "#Week":
        return (
          <>
            <Card.Title>Total Points earned this week</Card.Title>
            <Card.Text>{pointsWeek} points completed</Card.Text>
            <Link href={props.partner}>
              <Button>Visit Partner</Button>
            </Link>
          </>
        );
      case "#Month":
        return (
          <>
            <Card.Title>Total Points earned this month</Card.Title>
            <Card.Text>{pointsMonth} points completed</Card.Text>
            <Link href={props.partner}>
              <Button>Visit Partner</Button>
            </Link>
          </>
        );
      case "#Statistics":
        return (
          <>
            <Card.Title>View your statistics</Card.Title>
            <Card.Text>{props.totalPoints} points completed in total</Card.Text>
            <Link href={`/${props.user}/statistics`}>
              <Button>View statistics</Button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  /**
   * Method to fetch points earned this week
   */
  const fetchCompletedByWeek = () => {
    const current = new Date();
    const dayOfWeek = current.getDay();
    const numDay = current.getDate();
    const start = new Date(current);
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);
    const completedTasksByWeek = props.completedTasksUser.filter(
      (task: TaskCompleted) => {
        const startDate = new Date(start);
        const taskDate = new Date(task.dateCreated);
        return taskDate >= startDate;
      }
    );
    const totalMeekPoints = completedTasksByWeek.reduce((acc, task) => {
      return acc + task.meekPoints;
    }, 0);
    setPointsWeek(totalMeekPoints);
  };

  /**
   * Method to fetch points earned this month
   */
  const fetchCompletedByMonth = () => {
    const current = new Date();
    const firstDayOfMonth = new Date(
      current.getFullYear(),
      current.getMonth(),
      1
    );
    firstDayOfMonth.setHours(0, 0, 0, 0);
    const completedTasksByWeek = props.completedTasksUser.filter(
      (task: TaskCompleted) => {
        const taskDate = new Date(task.dateCreated);
        return taskDate >= firstDayOfMonth;
      }
    );
    const totalMeekPoints = completedTasksByWeek.reduce((acc, task) => {
      return acc + task.meekPoints;
    }, 0);
    setPointsMonth(totalMeekPoints);
  };

  return (
    <Card className="md:flex-grow ">
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#Total" onSelect={handleSelect}>
          <Nav.Item>
            <Nav.Link href="#Total">Total</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Week" onClick={fetchCompletedByWeek}>
              Week
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Month">Month</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Statistics">Statistics</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>{renderCardBody()}</Card.Body>
    </Card>
  );
}
