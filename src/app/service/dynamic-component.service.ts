import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core'

@Injectable()
export class DynamicComponentService {

    private compRef: ComponentRef<any>;

    private injector: Injector;
    private resolver: ComponentFactoryResolver;
    private appRef: ApplicationRef;

    constructor(
        injector: Injector,
        resolver: ComponentFactoryResolver,
        appRef: ApplicationRef
    ) {
        this.injector = injector;
        this.resolver = resolver;
        this.appRef = appRef;
    }

    public injectComponent<T>(component: Type<T>, propertySetter?: (type: T) => void): HTMLDivElement {

        const compFactory = this.resolver.resolveComponentFactory(component);
        this.compRef = compFactory.create(this.injector);

        if (propertySetter) {
          propertySetter(this.compRef.instance);
        }

        this.appRef.attachView(this.compRef.hostView);

        let div = document.createElement('div');
        div.appendChild(this.compRef.location.nativeElement);

        return div;
    }
}
