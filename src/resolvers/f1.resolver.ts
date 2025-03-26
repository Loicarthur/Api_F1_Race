import { Resolver, Query, Arg, UseMiddleware } from 'type-graphql';
import { F1Service } from '../services/f1.service';
import { 
  Driver,
  Race,
  RaceResult,
  DriverStanding,
  ConstructorStanding
} from '../types/f1.types';
import { isAuth } from '../middleware/auth';

@Resolver()
export class F1Resolver {
  private f1Service: F1Service;

  constructor() {
    this.f1Service = new F1Service();
  }

  @Query(() => [DriverStanding])
  @UseMiddleware(isAuth)
  async driverStandings(
    @Arg('season', { nullable: true }) season?: string
  ): Promise<DriverStanding[]> {
    return this.f1Service.getDriverStandings(season);
  }

  @Query(() => [RaceResult])
  @UseMiddleware(isAuth)
  async raceResults(
    @Arg('season') season: string,
    @Arg('round') round: string
  ): Promise<RaceResult[]> {
    return this.f1Service.getRaceResults(season, round);
  }

  @Query(() => Driver)
  @UseMiddleware(isAuth)
  async driverInfo(
    @Arg('driverId') driverId: string
  ): Promise<Driver> {
    return this.f1Service.getDriverInfo(driverId);
  }

  @Query(() => [Race])
  @UseMiddleware(isAuth)
  async raceSchedule(
    @Arg('season', { nullable: true }) season?: string
  ): Promise<Race[]> {
    return this.f1Service.getRaceSchedule(season);
  }

  @Query(() => [ConstructorStanding])
  @UseMiddleware(isAuth)
  async constructorStandings(
    @Arg('season', { nullable: true }) season?: string
  ): Promise<ConstructorStanding[]> {
    return this.f1Service.getConstructorStandings(season);
  }
}
