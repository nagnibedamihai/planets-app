import { Component, OnInit } from '@angular/core';

import { Planet } from '../../models/planet';
import { PlanetService } from '../../services/planets.service';

@Component({
    selector: 'app-planets',
    templateUrl: './planets.component.html',
    styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
    loading = false;
    planets: Planet[] = [];
    count = 0;
    page = 1;
    columns = [
        'name',
        'rotation_period',
        'orbital_period',
        'diameter',
        'climate',
        'gravity',
        'terrain',
        'surface_water',
        'population'
    ];

    constructor(private planetService: PlanetService) {
    }

    ngOnInit() {
        this.getPlanets(this.page);
    }

    getPlanets(page): void {
        this.loading = true;
        this.planetService.getPlanets(page)
            .subscribe(response => {
                this.planets = response.results.map(p => {
                    return {...p, id: p.url.split('/')[p.url.split('/').length - 2]};
                });
                this.count = response.count;
                this.loading = false;
            });
    }

    updatePage($event) {
        this.page = $event.pageIndex + 1;
        this.getPlanets(this.page);
        console.log($event);
    }
}
