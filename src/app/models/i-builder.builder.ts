import {isNullOrUndefined} from 'util';
export type IBuilder<T> = {
    [k in keyof T]: (arg: T[k]) => IBuilder<T>
    } & {build(): T};
export function Builder<T>(): IBuilder<T> {
    const built: any = {};
    const builder = new Proxy({}, {
        get(target, prop, receiver) {
            if ('build' === prop) {
                return () => built;
            }
            return (x: any): any => {
                built[prop] = x;
                return builder;
            };
        }
    });
    return builder as any;
}
export type IBuilderSearchParameter<T> =
      {[k in keyof T]: IBuilderSearchParameterParams<T, T[k]>}
    & {all: IBuilderSearchParameterParams<T, string>}
    & {setInitValue(initValue: string): IBuilderSearchParameter<T>}
    & {build(): string};
export type IBuilderSearchParameterParams<T, K> =
      {[k in keyof K]: IBuilderSearchParameterParams<T, K[k]>}
    & {equal(arg: K): IBuilderSearchParameter<T>}
    & {equalInsensitive(arg: K): IBuilderSearchParameter<T>}
    & {like(arg: K): IBuilderSearchParameter<T>}
    & {likeInsensitive(arg: K): IBuilderSearchParameter<T>}
    & {notEqual(arg: K): IBuilderSearchParameter<T>}
    & {greaterThan(arg: K): IBuilderSearchParameter<T>}
    & {greaterThanOrEqual(arg: K): IBuilderSearchParameter<T>}
    & {lessThan(arg: K): IBuilderSearchParameter<T>}
    & {lessThanOrEqual(arg: K): IBuilderSearchParameter<T>}
    & {in(arg: K[]): IBuilderSearchParameter<T>}
    & {notIn(arg: K[]): IBuilderSearchParameter<T>};
export function BuilderSearchParameter<T>(): IBuilderSearchParameter<T> {
    let searchString = null;
    let propertyNameBeforeOperation = null;
    const operations: Map<String, String> = new Map<String, String>();
    operations.set('equal', '==');
    operations.set('equalInsensitive', '=ins=');
    operations.set('like', '==');
    operations.set('likeInsensitive', '=ins=');
    operations.set('notEqual', '!=');
    operations.set('greaterThan', '=gt=');
    operations.set('greaterThanOrEqual', '=ge=');
    operations.set('lessThan', '=lt=');
    operations.set('lessThanOrEqual', '=le=');
    operations.set('in', '=in=');
    operations.set('notIn', '=out=');
    let retornarValoresEntreParenteses = (valores: any[]): string => {
        let valorFormatado = null;
        valores.forEach((valor) => {
            if (isNullOrUndefined(valorFormatado)) {
                valorFormatado = '(' + valor;
            } else {
                valorFormatado += ',' + valor;
            }
        });
        return valorFormatado + ')';
    };
    const builder = new Proxy({}, {
        get(target, prop, receiver) {
            if ('build' === prop) {
                return () => searchString;
            }
            if ('setInitValue' === prop) {
                return (x: string): any => {
                    searchString = x;
                    return builder;
                };
            }
            if ('all' === prop) {
                prop = '_all';
            }
            if (operations.get(prop.toString())) {
                return (x: any): any => {
                    let valorFormatado = x;
                    if (!isNullOrUndefined(valorFormatado) && (typeof x !== 'string' || (typeof x === 'string' && valorFormatado.length))) {
                        if (x instanceof Array && (prop.toString() === 'in' || prop.toString() === 'notIn')) {
                            valorFormatado = retornarValoresEntreParenteses(x);
                        }
                        if (prop.toString() === 'like' || prop.toString() === 'likeInsensitive') {
                            valorFormatado = '*' + valorFormatado + '*';
                        }
                        if (typeof x === 'string') {
                            valorFormatado = '\'' + valorFormatado + '\'';
                        }
                        if (isNullOrUndefined(searchString)) {
                            searchString = 'search=' + propertyNameBeforeOperation.toString() +
                                operations.get(prop.toString()) + valorFormatado;
                        } else {
                            searchString += ';' + propertyNameBeforeOperation.toString() +
                                operations.get(prop.toString()) + valorFormatado;
                        }
                    }
                    propertyNameBeforeOperation = null;
                    return builder;
                };
            }
            if (isNullOrUndefined(propertyNameBeforeOperation)) {
                propertyNameBeforeOperation = prop.toString();
            } else {
                propertyNameBeforeOperation += '.' + prop.toString();
            }
            return builder;
        }
    });
    return builder as any;
}
