import Link from "next/link";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "@mui/material/Button";
import { TaskCompleted } from "./profile";
import { useState } from "react";
import { Points } from "../types/meekpoints";

type PropType = {
  partner: string;
  user: string;
  points: Points;
};

export default function PointCardComponent(props: PropType) {
  const [activeTab, setActiveTab] = useState<string>("#Total");

  const handleSelect = (e: any) => {
    setActiveTab(e);
  };

  const renderCardBody = () => {
    switch (activeTab) {
      case "#Total":
        return (
          <>
            <Card.Title>Total Points earned</Card.Title>
            <Card.Text>
              {props.points ? props.points.total : 0} points completed
            </Card.Text>
            <Link href={props.partner}>
              <Button>Visit Partner</Button>
            </Link>
          </>
        );
      case "#Month":
        return (
          <>
            <Card.Title>Total Points earned this month</Card.Title>
            <Card.Text>{props.points.month} points completed</Card.Text>
            <Link href={props.partner}>
              <Button>Visit Partner</Button>
            </Link>
          </>
        );
      case "#Statistics":
        return (
          <>
            <Card.Title>View your statistics</Card.Title>
            <Card.Text>
              {props.points.total} points completed in total
            </Card.Text>
            <Link href={`/${props.user}/statistics`}>
              <Button>View statistics</Button>
            </Link>
          </>
        );
      case "#MeekRevise":
        return (
          <>
            <Card.Title>Start revising!</Card.Title>
            <Card.Text>Head over to MeekRevise</Card.Text>
            <Link href="/meekrevise">
              <Button>Visit MeekRevise</Button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="md:flex-grow ">
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#Total" onSelect={handleSelect}>
          <Nav.Item>
            <Nav.Link href="#Total">Total</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Month">Month</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Statistics">Statistics</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#MeekRevise">MeekRevise</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>{renderCardBody()}</Card.Body>
    </Card>
  );
}
