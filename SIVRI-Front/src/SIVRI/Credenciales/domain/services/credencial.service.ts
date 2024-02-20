import { Observable } from 'rxjs';
// import { UseCase } from '../../../../common/use-case';
import { TokenModel } from '../models/token.model';
import { CredencialCU } from '../../applicación/credencial.port';

export class GetUserProfileUseCase {

    constructor(private credencialService: CredencialCU) { }

    execute(
        params: {email: string, password: string}
    ): Observable<TokenModel> {
        return this.credencialService.autenticar(params);
    }
}