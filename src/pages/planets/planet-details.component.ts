import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Planet } from '../../models/planet';
import { PlanetService } from '../../services/planets.service';

@Component({
    selector: 'app-planet-details',
    templateUrl: './planet-details.component.html',
    styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit {
    planet: Planet;
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private planetService: PlanetService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.getPlanet();
    }

    getPlanet(): void {
        this.loading = true;
        const id = +this.route.snapshot.paramMap.get('id');
        this.planetService.getPlanet(id)
            .subscribe(planet => {
                this.planet = planet;
                this.loading = false;
            });
    }

    goBack(): void {
        this.location.back();
    }
}
