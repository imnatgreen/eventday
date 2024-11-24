import { env } from '$env/dynamic/private';

import { OAuth2Client, OAuth2Fetch } from '@badgateway/oauth2-client';

const parkrunClient = new OAuth2Client({
  tokenEndpoint: new URL('/auth/refresh', env.PARKRUN_API_BASE).href,
  clientId: 'parkrun',
  authenticationMethod: 'client_secret_post'
});

export const parkrunFetch = new OAuth2Fetch({
  client: parkrunClient,
  getNewToken: async () => {
    const res = await fetch(new URL('/user_auth.php', env.PARKRUN_API_BASE), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic bmV0ZHJlYW1zLWlwaG9uZS1zMDE6Z2ZLYkRENk5Ka1lvRm1raXNSKGlWRm9wUUNLV3piUWVRZ1pBWlpLSw=='
      },
      body: new URLSearchParams({
        username: env.PARKRUN_USER,
        password: env.PARKRUN_PASSWORD,
        scope: 'app',
        grant_type: 'password'
      })
    });
    const data = await res.json();

    return {
      accessToken: data.access_token,
      expiresAt: data.expires_in ? Date.now() + data.expires_in * 1000 : null,
      refreshToken: data.refresh_token ?? null
    };
  }
});

export const parkrunGet = async (
  path: string,
  options: { [key: string]: string | number | boolean },
  multi: false | { dataName: string; rangeName: string } = false
) => {
  const params = new URLSearchParams();
  Object.keys(options).forEach((key) => {
    params.append(key, options[key].toString());
  });

  const url = new URL(path, env.PARKRUN_API_BASE).href;

  if (!multi) {
    const urlWithParams = params.toString() ? `${url}?${params.toString()}` : url;
    const res = await parkrunFetch.fetch(urlWithParams);
    return await res.json();
  } else {
    const searchParams = new URLSearchParams(params);
    searchParams.append('offset', '0');
    searchParams.append('limit', '0');
    const urlWithParams = searchParams.toString() ? `${url}?${searchParams.toString()}` : url;
    const firstRequestRes = await parkrunFetch.fetch(urlWithParams);
    const firstRequest = await firstRequestRes.json();

    const range = firstRequest['Content-Range'][multi.rangeName][0];
    let data = firstRequest.data[multi.dataName];

    let amountDownloaded = Number.parseInt(range.last);
    const amountTotal = Number.parseInt(range.max);
    const amountRemaining = amountTotal - amountDownloaded;

    const amountPullsRequired = Math.ceil(amountRemaining / 100);

    const requests = [];
    for (let i = 0; i < amountPullsRequired; i++) {
      const stepSearchParams = new URLSearchParams(params);
      stepSearchParams.append('offset', amountDownloaded.toString());
      stepSearchParams.append('limit', '100');
      const stepUrlWithParams = stepSearchParams.toString()
        ? `${url}?${stepSearchParams.toString()}`
        : url;
      requests.push(parkrunFetch.fetch(stepUrlWithParams));
      amountDownloaded += 100;
    }

    const responses = await Promise.all(requests);
    const dataPromises = responses.map((res) => res.json());
    const dataResponses = await Promise.all(dataPromises);

    dataResponses.forEach((res) => {
      data = data.concat(res.data[multi.dataName]);
    });

    return data;
  }
};

export class ParkrunResult {
  SeriesID: number;
  EventNumber: number;
  RunId: number;
  EventLongName: string;
  FinishPosition: number;
  GenderPosition: number;
  EventDate: string;
  AthleteID: number;
  RunTime: string;
  WasPbRun: boolean;
  AgeGrading: number;
  AgeCategory: string;
  FirstTimer: boolean;
  GenuinePB: boolean;
  Updated: string;
  Assisted: boolean;
  FirstName: string;
  LastName: string;
  ClubID: number;
  ClubName: string;
  OrganisationID: number;
  OrgSubTypeID: number;
  HomeRunName: string;
  RunTotal: number;
  parkrunClubMembership: number;
  JuniorRunTotal: number;
  JuniorClubMembership: number;
  volcount: number;
  runnerSocial: string;

  constructor(data: Record<string, string>) {
    this.SeriesID = Number.parseInt(data.SeriesID);
    this.EventNumber = Number.parseInt(data.EventNumber);
    this.RunId = Number.parseInt(data.RunId);
    this.EventLongName = data.EventLongName;
    this.FinishPosition = Number.parseInt(data.FinishPosition);
    this.GenderPosition = Number.parseInt(data.GenderPosition);
    this.EventDate = data.EventDate;
    this.AthleteID = Number.parseInt(data.AthleteID);
    this.RunTime = data.RunTime;
    this.WasPbRun = !!Number.parseInt(data.WasPbRun);
    this.AgeGrading = Number.parseFloat(data.AgeGrading);
    this.AgeCategory = data.AgeCategory;
    this.FirstTimer = !!Number.parseInt(data.FirstTimer);
    this.GenuinePB = !!Number.parseInt(data.GenuinePB);
    this.Updated = data.Updated;
    this.Assisted = !!Number.parseInt(data.Assisted);
    this.FirstName = data.FirstName;
    this.LastName = data.LastName;
    this.ClubID = Number.parseInt(data.ClubID);
    this.ClubName = data.ClubName;
    this.OrganisationID = Number.parseInt(data.OrganisationID);
    this.OrgSubTypeID = Number.parseInt(data.OrgSubTypeID);
    this.HomeRunName = data.HomeRunName;
    this.RunTotal = Number.parseInt(data.RunTotal);
    this.parkrunClubMembership = Number.parseInt(data.parkrunClubMembership);
    this.JuniorRunTotal = Number.parseInt(data.JuniorRunTotal);
    this.JuniorClubMembership = Number.parseInt(data.JuniorClubMembership);
    this.volcount = Number.parseInt(data.volcount);
    this.runnerSocial = data.runnerSocial;
  }
}

export class ParkrunVolunteer {
  VolID: number;
  SeriesID: number;
  EventNumber: number;
  RunId: number;
  AthleteID: number;
  FirstName: string;
  LastName: string;
  EventLongName: string;
  EventLocation: string;
  CountryCode: number;
  EventDate: string;

  constructor(data: Record<string, string>) {
    this.VolID = Number.parseInt(data.VolID);
    this.SeriesID = Number.parseInt(data.SeriesID);
    this.EventNumber = Number.parseInt(data.EventNumber);
    this.RunId = Number.parseInt(data.RunId);
    this.AthleteID = Number.parseInt(data.AthleteID);
    this.FirstName = data.FirstName;
    this.LastName = data.LastName;
    this.EventLongName = data.EventLongName;
    this.EventLocation = data.EventLocation;
    this.CountryCode = Number.parseInt(data.CountryCode);
    this.EventDate = data.EventDate;
  }
}

export class ParkrunRun {
  EventNumber: number;
  RunId: number;
  NumberRunners: number;
  EventDate: string;
  NumberOfVolunteers: number;
  abstractId: number | null;

  constructor(data: Record<string, string>) {
    this.EventNumber = Number.parseInt(data.EventNumber);
    this.RunId = Number.parseInt(data.RunId);
    this.NumberRunners = Number.parseInt(data.NumberRunners);
    this.EventDate = data.EventDate;
    this.NumberOfVolunteers = Number.parseInt(data.NumberOfVolunteers);
    this.abstractId = Number.parseInt(data.abstractId) || null;
  }
}

export type ParkrunRunReport = {
  id: number;
  participants: number;
  firstTimers: string[];
  newPBs: string[];
  milestones: ParkrunRunReportMilestones;
  volunteers: string[];
};

export type ParkrunRunReportMilestones = {
  half: string[];
  full: string[];
  ultra: string[];
  hundred: string[];
};
