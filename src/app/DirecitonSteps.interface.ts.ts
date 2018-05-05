export class DirecitonSteps {
    distance: number;
    duration: number;
    end_location_lat: number;
    end_location_lng: number;
    stepWeather: StepWeather;
    constructor(distance: number, duration: number, end_location_lat: number, end_location_lng: number) {
        this.distance = distance;
        this.duration = duration;
        this.end_location_lat = end_location_lat;
        this.end_location_lng = end_location_lng;
    }
}

export class StepWeather {
    name: string;
    temperature: number;
    weather: string;
    wind: number;
    constructor(name: string, temperature: number, weather: string, wind: number) {
        this.name = name;
        this.temperature = temperature;
        this.weather = weather;
        this.wind = wind;
    }
}
