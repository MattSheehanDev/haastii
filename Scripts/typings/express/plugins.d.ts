declare module "serve-favicon" {
}

declare module "body-parser" {
    function json(): any;
    function urlencoded(options: any): any;
}

declare module "morgan" {
    // 'morgan' is both a module and a callable function,
    // so we create a module and function 'e' and export it
    // from 'morgan' to merge the two declarations.
    function e(t: string): any;

    module e {
    }
    export = e;
}

declare module "method-override" {
    function e(): any;

    module e {
    }
    export = e;
}

declare module "errorhandler" {
    function e(): any;

    module e {
    }
    export = e;
}

