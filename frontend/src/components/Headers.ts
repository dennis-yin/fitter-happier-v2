export default class Headers {
  'access-token': string | null;
  client: string | null;
  uid: string | null;

  constructor(
    accessToken: string | null,
    client: string | null,
    uid: string | null
  ) {
    this["access-token"] = accessToken;
    this.client = client;
    this.uid = uid;
  }

  get formatted() {
    return {
      'access-token': this['access-token'],
      client: this.client,
      uid: this.uid
    };
  }
}
