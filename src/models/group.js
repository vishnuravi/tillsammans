class Group {
  constructor(
    id,
    datum,
    gruppnamn,
    kontakt,
    kommentarer,
    telefon,
    email,
    address,
    postkod,
    status
  ) {
    this.id = id;
    this.datum = datum;
    this.gruppnamn = gruppnamn;
    this.kontakt = kontakt;
    this.kommentarer = kommentarer;
    this.telefon = telefon;
    this.email = email;
    this.address = address;
    this.postkod = postkod;
    this.status = status;
  }
}

export default Group;
