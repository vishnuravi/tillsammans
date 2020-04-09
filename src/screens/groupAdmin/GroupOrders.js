import React, { useEffect, useState } from 'react';
import moment from 'moment';

//Models
import Order from '../../models/order';

//Bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from '../tables/Table';
import HelpForm from '../users/HelpForm';
import AddButtonHeader from '../../components/AddButtonHeader';
import RefreshButton from '../../components/RefreshButton';

const GroupOrders = props => {
  const firestore = firebase.firestore();

  //Set constants
  const [data, setData] = useState({
    distributedGroupOrders: [],
    distributedVolunteerOrders: [],
    doneOrders: [],
    pausedOrders: [],
    cancelledOrders: []
  });

  async function getOrders() {
    const orders = [];
    const querySnapshot = await firestore.collection('orders').get();
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format('lll');

      orders.push(
        new Order(
          doc.id,
          resData.gruppId,
          resData.volontärId,
          readableDate,
          resData.typ,
          resData.beskrivning,
          resData.swish,
          resData.kontant,
          resData.faktura,
          resData.tidsrymd,
          resData.telefon,
          resData.förnamn,
          resData.efternamn,
          resData.email,
          resData.address,
          resData.postkod,
          resData.status,
          resData.kommentarer
        )
      );
    });

    //Only get the orders which match our current group id
    const currentGroupOrders = orders.filter(
      data => data.gruppId === props.groupId
    );
    setData({
      distributedGroupOrders: currentGroupOrders.filter(
        data => data.status === '2'
      ),
      distributedVolunteerOrders: currentGroupOrders.filter(
        data => data.status === '3'
      ),
      doneOrders: currentGroupOrders.filter(data => data.status === '4'),
      pausedOrders: currentGroupOrders.filter(data => data.status === '5'),
      cancelledOrders: currentGroupOrders.filter(data => data.status === '6')
    });
  }

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Beställningar"
        buttonText="beställning"
        formForModal={<HelpForm />}
      />
      <br />
      <h4>Hur vi hanterar beställningar</h4>
      <ol>
        <li>
          Öppna redigering genom att klicka på pennan till vänster om
          beställningen
        </li>
        <li>
          Ändra status till det som passar. (Du kan också uppdatera annan
          information om du vill - till exempel 'kommentarer' - men 'status' är
          viktigast)
        </li>
        <li>
          Klicka på bock-ikonen till vänster om beställningen för att spara
          ändringar
        </li>
        <li>
          Om inte ändringarna syns direkt, klicka den lila refresh-knappen nere
          till höger
        </li>
        <li>Klart! Ändringarna här syns nu också för samordnaren.</li>
      </ol>
      <p>
        För frågor, kontakta asaisacson@gmail.com. Vi uppdaterar hela tiden
        systemet och tar gärna emot tips om hur det kan bli bättre!
      </p>
      <br />
      <h5>Mer information här</h5>
      <a href="https://docs.google.com/document/d/1lLxe5x-4yJ1qPHfGkBkfle2EIp7tVjUU4aMhYuRQQ5Y/edit?usp=sharing">
        Gemensamma procedurer för beställningar och volontärer
      </a>
      <RefreshButton refreshAction={getOrders} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Att bli utförda{' '}
              {data.distributedGroupOrders.length ? (
                <Badge pill variant="danger">
                  {data.distributedGroupOrders.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={data.distributedGroupOrders}
            refreshAction={getOrders}
          />
        </Tab>
        {/* <Tab
          eventKey="aktiva"
          title={`Fördelade (${
            data.distributedVolunteerOrders.length
              ? data.distributedVolunteerOrders.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={data.distributedVolunteerOrders}
            refreshAction={getOrders}
          />
        </Tab> */}
        <Tab
          eventKey="klara"
          title={`Klara (${
            data.doneOrders.length ? data.doneOrders.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={data.doneOrders}
            refreshAction={getOrders}
          />
        </Tab>
        <Tab
          eventKey="pausad"
          title={`Pausade (${
            data.pausedOrders.length ? data.pausedOrders.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={data.pausedOrders}
            refreshAction={getOrders}
          />
        </Tab>
        <Tab
          eventKey="avbokade"
          title={`Avbokade (${
            data.cancelledOrders.length ? data.cancelledOrders.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={data.cancelledOrders}
            refreshAction={getOrders}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupOrders;
