import "reflect-metadata";
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import { EditFormValidator } from "./EditFormValidator";
import { IValidatorListAsync } from "@ExemplarInterfaces/IValidatorListAsync";
import { ExternalWebForm } from "@ExemplarViewModels/ExternalWebForm";
 

export class IocContainer {

    private _container!: Container;

    get container(): Container {
        return this._container;
    }

    public configureIocContainer(): void {
        this._container = new Container({ defaultScope: "Singleton" });
        this._container.bind<IValidatorListAsync<ExternalWebForm>>("IValidatorListAsync<ExternalWebForm>").to(EditFormValidator);
    }
}
const iocContainer = new IocContainer();
iocContainer.configureIocContainer();
const { lazyInject } = getDecorators(iocContainer.container);
export { lazyInject };
