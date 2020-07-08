import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";
import Button from "react-bootstrap/Button";

import ConfirmationCustomer from "../../components/ConfirmationCustomer";
import ConfirmationInternal from "../../components/ConfirmationInternal";

import RenderBadge from "./../../components/RenderBadge";

import { small, medium, large, xlarge } from "./CellSizes";
import {
  sendOrderEmail,
  sendConfirmationEmail,
  sendGroupOrderEmail,
  sendVolunteerEmail,
  sendGeneralVolunteerInfo,
  sendGeneralFikerInfo,
  sendWelcomeEmail,
} from "./Emails";
import {
  groupDropdown,
  groupStatusDropdown,
  groupStatusDropdownForGroups,
  fikerStatusDropdown,
  volunteerStatusDropdown,
  volunteerStatusDropdownForGroups,
} from "./Dropdowns";

import firebase from "firebase/app";
import "firebase/firestore";
import ButtonToFormEmail from "../../components/ButtonToFormEmail";
import ButtonToAction from "../../components/ButtonToAction";

//TODO: make below leaner, and split into more components
const Table = (props) => {
  const [data, setData] = useState(props.tableData);

  //Common fields
  const mottaget = { title: "Mottaget", field: "datum", editable: "never" };
  const förnamn = {
    title: "Förnamn",
    field: "förnamn",
    editable: "never",
  };
  const efternamn = {
    title: "Efternamn",
    field: "efternamn",
    editable: "never",
  };
  const tidsrymd = {
    title: "Tid kan vänta",
    field: "tidsrymd",
    editable: "never",
    cellStyle: small,
    headerStyle: small,
  };
  const kommentarer = {
    title: "Kommentarer (skriv extra info här)",
    field: "kommentarer",
    cellStyle: large,
    headerStyle: large,
  };
  const beskrivning = {
    title: "Beskrivning",
    field: "beskrivning",
    editable: "never",
    cellStyle: xlarge,
    headerStyle: xlarge,
  };
  const description = {
    title: "Beskrivning",
    field: "description",
    editable: "never",
    cellStyle: xlarge,
    headerStyle: xlarge,
  };
  const lecture = {
    title: "Föreslagen föreläsning",
    field: "lecture",
    editable: "never",
    cellStyle: xlarge,
    headerStyle: xlarge,
  };
  const typ = {
    title: "Typ",
    field: "typ",
    editable: "never",
    cellStyle: medium,
    headerStyle: medium,
  };
  const swish = {
    title: "Swish",
    field: "swish",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.swish} />,
  };
  const kontant = {
    title: "Kontant",
    field: "kontant",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.kontant} />,
  };
  const faktura = {
    title: "Faktura",
    field: "faktura",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.faktura} />,
  };
  const telefon = { title: "Telefon", field: "telefon" };
  const email = { title: "Email", field: "email" };
  const address = {
    title: "Address",
    field: "address",
    cellStyle: medium,
    headerStyle: medium,
  };
  const postkod = { title: "Postkod", field: "postkod" };
  const språk = { title: "Språk", field: "språk", editable: "never" };
  const födelseår = {
    title: "Födelseår",
    field: "födelseår",
    editable: "never",
  };
  const körkort = {
    title: "Har körkort",
    field: "körkort",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.körkort} />,
  };
  const bil = {
    title: "Har bil",
    field: "bil",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.bil} />,
  };
  const mat = {
    title: "Mat",
    field: "mat",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.mat} />,
  };
  const varor = {
    title: "Varor",
    field: "varor",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.varor} />,
  };
  const ärenden = {
    title: "Ärenden",
    field: "ärenden",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.ärenden} />,
  };
  const djur = {
    title: "Djur",
    field: "djur",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.djur} />,
  };
  const prata = {
    title: "Prata",
    field: "prata",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.prata} />,
  };
  const myndigheter = {
    title: "Myndigheter",
    field: "myndigheter",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.myndigheter} />,
  };
  const teknik = {
    title: "Teknik",
    field: "teknik",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.teknik} />,
  };
  const oldSchool = {
    title: "Via telefon",
    field: "oldSchool",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.oldSchool} />,
  };
  const newSchool = {
    title: "Via smartphone/platta/dator",
    field: "newSchool",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.newSchool} />,
  };
  const books = {
    title: "Bokklubb",
    field: "books",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.books} />,
  };
  const gardening = {
    title: "Trädgård",
    field: "gardening",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.gardening} />,
  };
  const globalPolitics = {
    title: "Världsläget",
    field: "globalPolitics",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.globalPolitics} />,
  };
  const localCulture = {
    title: "LokalKultur",
    field: "localCulture",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.localCulture} />,
  };
  const newTech = {
    title: "Ny teknik",
    field: "newTech",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.newTech} />,
  };
  const lectures = {
    title: "Föreläsningar",
    field: "lectures",
    editable: "never",
    render: (rowData) => <RenderBadge bool={rowData.lectures} />,
  };

  //Column headers
  const orderColumns = [
    mottaget,
    tidsrymd,
    förnamn,
    efternamn,
    {
      title: "Status",
      field: "status",
      lookup: groupStatusDropdown,
      cellStyle: large,
      headerStyle: large,
      render: (rowData) => (
        <>
          <ButtonToAction
            conditionForGreen={rowData.gruppId && rowData.gruppId !== "0"}
            statusCopy={
              rowData.gruppId && rowData.gruppId !== "0"
                ? rowData.gruppId
                : "Ingen grupp vald"
            }
            buttonCopy={
              rowData.gruppId && rowData.gruppId !== "0"
                ? "Välj annan grupp"
                : "Välj grupp"
            }
            formData={rowData}
          />
          <ButtonToFormEmail
            conditionForGreen={rowData.skickadGrupp}
            statusCopy={
              rowData.skickadVolontär
                ? "Skickad till grupp"
                : "Inte skickad till grupp ännu"
            }
            buttonCopy={rowData.skickadGrupp ? "Skicka igen" : "Skicka grupp"}
            formData={rowData}
          />
          {!rowData.email ? (
            <ButtonToAction
              conditionForGreen={rowData.skickadBeställare}
              statusCopy={
                !rowData.email && rowData.telefon
                  ? `Bekräfta via ${rowData.telefon}`
                  : "Ingen email eller telefon"
              }
              buttonCopy={
                rowData.skickadBeställare
                  ? "Beställare kontaktad"
                  : "Klicka när kontaktat"
              }
              formData={rowData}
            />
          ) : (
            <ButtonToFormEmail
              conditionForGreen={rowData.skickadBeställare}
              conditionForDisabled={!rowData.email}
              statusCopy={
                rowData.skickadBeställare
                  ? "Bekräftelse skickad"
                  : "Ingen bekräftelse skickad"
              }
              buttonCopy={
                rowData.skickadBeställare ? "Skicka igen" : "Skicka bekräftelse"
              }
              formData={rowData}
            />
          )}
          <ButtonToFormEmail
            conditionForGreen={rowData.skickadVolontär}
            statusCopy={
              rowData.skickadVolontär
                ? "Skickad till volontär"
                : "Ingen volontär ännu"
            }
            buttonCopy={
              rowData.skickadVolontär ? "Skicka igen" : "Skicka volontär"
            }
            formData={rowData}
          />
        </>

        // <ConfirmationInternal
        //   isGroupConfirmation={true}
        //   itemId={rowData.id}
        //   isConfirmed={rowData.skickadGrupp}
        //   refreshAction={props.refreshAction}
        //   onClickAction={sendOrderEmail.bind(this, rowData)}
        // />
      ),
    },
    {
      title: "Grupp",
      field: "gruppId",
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Detaljer till grupp",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <ButtonToFormEmail
          conditionForGreen={rowData.skickadGrupp}
          buttonCopy={"Sätt grupp"}
          formData={rowData}
        />

        // <ConfirmationInternal
        //   isGroupConfirmation={true}
        //   itemId={rowData.id}
        //   isConfirmed={rowData.skickadGrupp}
        //   refreshAction={props.refreshAction}
        //   onClickAction={sendOrderEmail.bind(this, rowData)}
        // />
      ),
    },
    {
      title: "Bekräftelse till beställare",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) =>
        rowData.email ? (
          <ButtonToFormEmail
            conditionForGreen={rowData.skickadBeställare}
            buttonCopy={"Skicka bekräftelse"}
            formData={rowData}
          />
        ) : (
          <div>Ingen email angiven, ring istället {rowData.telefon}</div>
        ),
      // <ConfirmationCustomer
      //   isCustomerConfirmation={true}
      //   buttonText="Skicka bekräftelse"
      //   refreshAction={props.refreshAction}
      //   onClickAction={sendConfirmationEmail.bind(this, rowData)}
      //   isConfirmed={rowData.skickadBeställare}
      //   data={rowData}
      // />
    },
    {
      title: "Detaljer till volontär",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <ConfirmationInternal
          isOrderInfoToVolunteer={true}
          itemId={rowData.id}
          isConfirmed={rowData.skickadVolontär}
          refreshAction={props.refreshAction}
          onClickAction={sendGroupOrderEmail.bind(this, rowData)}
        />
      ),
    },
    kommentarer,
    beskrivning,
    typ,
    swish,
    kontant,
    faktura,
    telefon,
    email,
    address,
    postkod,
  ];

  const groupOrderColumns = [
    mottaget,
    tidsrymd,
    förnamn,
    efternamn,
    {
      title: "Status",
      field: "status",
      lookup: groupStatusDropdownForGroups,
      cellStyle: small,
      headerStyle: small,
    },
    {
      title: "Grupp",
      field: "gruppId",
      editable: "never",
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Bekräftelse till beställare",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <ConfirmationCustomer
          isCustomerConfirmation={true}
          refreshAction={props.refreshAction}
          onClickAction={sendConfirmationEmail.bind(this, rowData)}
          isConfirmed={rowData.skickadBeställare}
          data={rowData}
        />
      ),
    },
    {
      title: "Detaljer till volontär",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <ConfirmationInternal
          isOrderInfoToVolunteer={true}
          itemId={rowData.id}
          isConfirmed={rowData.skickadVolontär}
          refreshAction={props.refreshAction}
          onClickAction={sendGroupOrderEmail.bind(this, rowData)}
        />
      ),
    },
    kommentarer,
    beskrivning,
    typ,
    swish,
    kontant,
    faktura,
    telefon,
    email,
    address,
    postkod,
  ];

  const fikersColumns = [
    mottaget,
    förnamn,
    efternamn,
    {
      title: "Status",
      field: "status",
      lookup: fikerStatusDropdown,
      cellStyle: small,
      headerStyle: small,
    },
    {
      title: "Grupp",
      field: "gruppId",
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium,
    },
    // {
    //   title: "Detaljer till grupp",
    //   field: "skicka",
    //   cellStyle: medium,
    //   headerStyle: medium,
    //   editable: "never",
    //   render: (rowData) => (
    //     <ConfirmationInternal
    //       isVolToGroupConf={true}
    //       itemId={rowData.id}
    //       isConfirmed={rowData.skickadVolontärTillGrupp}
    //       refreshAction={props.refreshAction}
    //       onClickAction={sendVolunteerEmail.bind(this, rowData)}
    //     />
    //   ),
    // },
    // {
    //   title: "Bekräftelse till fikaintressent",
    //   field: "skicka",
    //   cellStyle: medium,
    //   headerStyle: medium,
    //   editable: "never",
    //   render: (rowData) => (
    //     <ConfirmationCustomer
    //       isConfToVol={true}
    //       refreshAction={props.refreshAction}
    //       onClickAction={sendWelcomeEmail.bind(this, rowData)}
    //       isConfirmed={rowData.skickadBekräftelseTillVolontär}
    //       data={rowData}
    //     />
    //   ),
    // },
    {
      title: "Kopiera detaljer",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <Button
          onClick={sendGeneralFikerInfo.bind(this, rowData)}
          className="small-button"
          size="sm"
        >
          Kopiera detaljer
        </Button>
      ),
    },
    kommentarer,
    description,
    telefon,
    email,
    språk,
    oldSchool,
    newSchool,
    books,
    gardening,
    globalPolitics,
    localCulture,
    newTech,
    lectures,
    lecture,
  ];

  const volunteerColumns = [
    mottaget,
    förnamn,
    efternamn,
    {
      title: "Status",
      field: "status",
      lookup: volunteerStatusDropdown,
      cellStyle: small,
      headerStyle: small,
    },
    {
      title: "Grupp",
      field: "gruppId",
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Detaljer till grupp",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <ConfirmationInternal
          isVolToGroupConf={true}
          itemId={rowData.id}
          isConfirmed={rowData.skickadVolontärTillGrupp}
          refreshAction={props.refreshAction}
          onClickAction={sendVolunteerEmail.bind(this, rowData)}
        />
      ),
    },
    {
      title: "Bekräftelse till volontär",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <ConfirmationCustomer
          isConfToVol={true}
          refreshAction={props.refreshAction}
          onClickAction={sendWelcomeEmail.bind(this, rowData)}
          isConfirmed={rowData.skickadBekräftelseTillVolontär}
          data={rowData}
        />
      ),
    },
    {
      title: "Kopiera detaljer",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <Button
          onClick={sendGeneralVolunteerInfo.bind(this, rowData)}
          className="small-button"
          size="sm"
        >
          Kopiera detaljer
        </Button>
      ),
    },
    kommentarer,
    beskrivning,
    telefon,
    email,
    address,
    postkod,
    språk,
    födelseår,
    körkort,
    bil,
    mat,
    varor,
    ärenden,
    djur,
    prata,
    myndigheter,
    teknik,
  ];

  const groupVolunteersColumns = [
    mottaget,
    förnamn,
    efternamn,
    {
      title: "Status",
      field: "status",
      lookup: volunteerStatusDropdownForGroups,
      cellStyle: small,
      headerStyle: small,
    },
    {
      title: "Grupp",
      field: "gruppId",
      editable: "never",
      lookup: groupDropdown,
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Bekräftelse till volontär",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <ConfirmationCustomer
          isConfToVol={true}
          refreshAction={props.refreshAction}
          onClickAction={sendWelcomeEmail.bind(this, rowData)}
          isConfirmed={rowData.skickadBekräftelseTillVolontär}
          data={rowData}
        />
      ),
    },
    {
      title: "Kopiera detaljer",
      field: "skicka",
      cellStyle: medium,
      headerStyle: medium,
      editable: "never",
      render: (rowData) => (
        <Button
          onClick={sendGeneralVolunteerInfo.bind(this, rowData)}
          className="small-button"
          size="sm"
        >
          Kopiera detaljer
        </Button>
      ),
    },
    kommentarer,
    beskrivning,
    telefon,
    email,
    address,
    postkod,
    språk,
    födelseår,
    körkort,
    bil,
    mat,
    varor,
    ärenden,
    djur,
    prata,
    myndigheter,
    teknik,
  ];

  const groupColumns = [
    {
      title: "Gruppnamn",
      field: "gruppnamn",
      render: (rowData) => (
        <Link to={`/grupp/${rowData.länkNamn}/${rowData.id}`}>
          {rowData.gruppnamn}
        </Link>
      ),
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Beskrivning",
      field: "kommentarer",
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Kontakt",
      field: "kontakt",
      cellStyle: medium,
      headerStyle: medium,
    },
    telefon,
    {
      title: "Email",
      field: "email",
      cellStyle: medium,
      headerStyle: medium,
    },
    {
      title: "Reserv",
      field: "reserv",
      cellStyle: medium,
      headerStyle: medium,
    },
    { title: "Reserv telefon", field: "reservTelefon" },
    {
      title: "Reserv email",
      field: "reservEmail",
      cellStyle: medium,
      headerStyle: medium,
    },
    address,
    postkod,
    { title: "Skapad", field: "datum", editable: "never" },
  ];

  const cancelledColumns = [
    mottaget,
    kommentarer,
    telefon,
    email,
    address,
    postkod,
  ];

  //Set column headers depending on which screen we are in.
  const columndata = props.isOrders
    ? orderColumns
    : props.isGroupOrders
    ? groupOrderColumns
    : props.isVolunteers
    ? volunteerColumns
    : props.isFikers
    ? fikersColumns
    : props.isGroupFikers
    ? fikersColumns
    : props.isGroupVolunteers
    ? groupVolunteersColumns
    : props.isGroups
    ? groupColumns
    : cancelledColumns;

  //Prep firestore
  const db = firebase.firestore();

  //Update existing order
  async function updateOrder(newData, oldData) {
    const currDocId = newData.id;
    let orderRef = db.collection("orders").doc(currDocId);

    orderRef.update({
      gruppId: newData.gruppId ? newData.gruppId : "",
      volontärId: newData.volontärId ? newData.volontärId : "",
      datum: newData.datum ? newData.datum : "",
      typ: newData.typ ? newData.typ : "Ingen",
      beskrivning: newData.beskrivning ? newData.beskrivning : "",
      swish: newData.swish ? newData.swish : false,
      kontant: newData.kontant ? newData.kontant : false,
      faktura: newData.faktura ? newData.faktura : false,
      tidsrymd: newData.tidsrymd ? newData.tidsrymd : "",
      telefon: newData.telefon ? newData.telefon : "",
      förnamn: newData.förnamn ? newData.förnamn : "",
      efternamn: newData.efternamn ? newData.efternamn : "",
      email: newData.email ? newData.email : "",
      address: newData.address ? newData.address : "",
      postkod: newData.postkod ? newData.postkod : "",
      status: newData.status ? newData.status : "",
      kommentarer: newData.kommentarer ? newData.kommentarer : "",
    });
  }

  //Update existing volunteer
  async function updateFiker(newData, oldData) {
    const currDocId = newData.id;
    let fikerRef = db.collection("fika").doc(currDocId);

    fikerRef.update({
      gruppId: newData.gruppId ? newData.gruppId : "",
      förnamn: newData.förnamn ? newData.förnamn : "",
      efternamn: newData.efternamn ? newData.efternamn : "",
      telefon: newData.telefon ? newData.telefon : "",
      email: newData.email ? newData.email : "",
      description: newData.description ? newData.description : "",
      oldSchool: newData.oldSchool ? newData.oldSchool : false,
      newSchool: newData.newSchool ? newData.newSchool : false,
      interests: newData.interests ? newData.interests : "",
      språk: newData.språk ? newData.språk : "",
      books: newData.books ? newData.books : false,
      gardening: newData.gardening ? newData.gardening : false,
      globalPolitics: newData.globalPolitics ? newData.globalPolitics : false,
      localCulture: newData.localCulture ? newData.localCulture : false,
      newTech: newData.newTech ? newData.newTech : false,
      lectures: newData.lectures ? newData.lectures : false,
      lecture: newData.lecture ? newData.lecture : "",
      date: newData.date ? newData.date : "",
      status: newData.status ? newData.status : "1",
      kommentarer: newData.kommentarer ? newData.kommentarer : "",
    });
  }

  //Update existing volunteer
  async function updateVolunteer(newData, oldData) {
    const currDocId = newData.id;
    let volunteerRef = db.collection("volunteers").doc(currDocId);

    volunteerRef.update({
      gruppId: newData.gruppId ? newData.gruppId : "",
      förnamn: newData.förnamn ? newData.förnamn : "",
      efternamn: newData.efternamn ? newData.efternamn : "",
      telefon: newData.telefon ? newData.telefon : "",
      email: newData.email ? newData.email : "",
      address: newData.address ? newData.address : "",
      postkod: newData.postkod ? newData.postkod : "",
      beskrivning: newData.beskrivning ? newData.beskrivning : "",
      språk: newData.språk ? newData.språk : "",
      födelseår: newData.födelseår ? newData.födelseår : "",
      körkort: newData.körkort ? newData.körkort : false,
      bil: newData.bil ? newData.bil : false,
      mat: newData.mat ? newData.mat : false,
      varor: newData.varor ? newData.varor : false,
      ärenden: newData.ärenden ? newData.ärenden : false,
      djur: newData.djur ? newData.djur : false,
      prata: newData.prata ? newData.prata : false,
      myndigheter: newData.myndigheter ? newData.myndigheter : false,
      teknik: newData.teknik ? newData.teknik : false,
      datum: newData.datum ? newData.datum : "",
      status: newData.status ? newData.status : "1",
      kommentarer: newData.kommentarer ? newData.kommentarer : "",
    });
  }

  //Update existing group
  async function updateGroup(newData, oldData) {
    const currDocId = newData.id;
    let groupRef = db.collection("groups").doc(currDocId);

    groupRef.update({
      datum: newData.datum ? newData.datum : "",
      gruppnamn: newData.gruppnamn ? newData.gruppnamn : "",
      kontakt: newData.kontakt ? newData.kontakt : "",
      kommentarer: newData.kommentarer ? newData.kommentarer : "",
      telefon: newData.telefon ? newData.telefon : "",
      email: newData.email ? newData.email : "",
      reserv: newData.reserv ? newData.reserv : "",
      reservTelefon: newData.reservTelefon ? newData.reservTelefon : "",
      reservEmail: newData.reservEmail ? newData.reservEmail : "",
      address: newData.address ? newData.address : "",
      postkod: newData.postkod ? newData.postkod : "",
      status: newData.status ? newData.status : "1",
    });
  }

  //Update existing cancellation
  async function updateCancelled(newData, oldData) {
    const currDocId = newData.id;
    let cancelledRef = db.collection("cancellations").doc(currDocId);

    cancelledRef.update({
      datum: newData.datum ? newData.datum : "",
      telefon: newData.telefon ? newData.telefon : "",
      email: newData.email ? newData.email : "",
      address: newData.address ? newData.address : "",
      postkod: newData.postkod ? newData.postkod : "",
      status: newData.status ? newData.status : "1",
    });
  }

  //Re-render if the data passed to the table changes - which it should do if we edit a row
  useEffect(() => {
    console.log("data has changed - rerendering");
    setData(props.tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tableData]);

  return (
    <MaterialTable
      title=""
      columns={columndata}
      data={data}
      options={{
        paging: true,
        exportButton: true,
        draggable: true,
      }}
      localization={{
        pagination: {
          labelDisplayedRows: "{from}-{to} av {count}",
        },
        toolbar: {
          nRowsSelected: "{0} rader valda",
        },
        header: {
          actions: " ",
        },
        body: {
          emptyDataSourceMessage: "Här var det tomt!",
          filterRow: {
            filterTooltip: "Filter",
          },
        },
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            props.isOrders || props.isGroupOrders
              ? updateOrder(newData, oldData)
              : props.isVolunteers || props.isGroupVolunteers
              ? updateVolunteer(newData, oldData)
              : props.isFikers || props.isGroupFikers
              ? updateFiker(newData, oldData)
              : props.isGroups
              ? updateGroup(newData, oldData)
              : updateCancelled(newData, oldData);
            props.refreshAction();
            resolve();
          }),
      }}
    />
  );
};

export default Table;
