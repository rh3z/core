import { ProviderRepository } from "../../repositories";
import { AbstractServiceProvider } from "../../support";
import { AbstractBootstrapper } from "../bootstrapper";

/**
 * @export
 * @class LoadServiceProviders
 * @extends {AbstractBootstrapper}
 */
export class LoadServiceProviders extends AbstractBootstrapper {
    /**
     * @returns {Promise<void>}
     * @memberof RegisterProviders
     */
    public async bootstrap(): Promise<void> {
        for (const [pkg, opts] of Object.entries(this.app.config("providers"))) {
            const provider: AbstractServiceProvider = new (require(pkg)).ServiceProvider(this.app, opts);

            this.app.resolve<ProviderRepository>("providers").set(pkg, provider);
        }
    }
}