import {TestBed} from '@angular/core/testing';

import {AuthUserGuard} from './auth-user.guard';

describe('AuthGuardService', () => {
    let service: AuthUserGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthUserGuard);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
