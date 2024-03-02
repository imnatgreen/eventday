import { env } from '$env/dynamic/private';

import { Parkrun } from 'parkrun.js';
import { ParkrunNetError } from 'parkrun.js/src/errors';

export const parkrunGet = async (
  path: string,
  options: object,
  multi: false | { dataName: string; rangeName: string } = false
) => {
  const client = await Parkrun.authSync(env.PARKRUN_USER, env.PARKRUN_PASSWORD);

  if (!multi) {
    const net = client._getAuthedNet();
    const res = await net
      .get(path, {
        params: { ...options, ...net._params }
      })
      .catch((err) => {
        throw new ParkrunNetError(err);
      });
    return await res.data;
  } else {
    return await client._multiGet(path, options, multi.dataName, multi.rangeName);
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

  constructor(data: Record<string, string>) {
    this.EventNumber = Number.parseInt(data.EventNumber);
    this.RunId = Number.parseInt(data.RunId);
    this.NumberRunners = Number.parseInt(data.NumberRunners);
    this.EventDate = data.EventDate;
    this.NumberOfVolunteers = Number.parseInt(data.NumberOfVolunteers);
  }
}
