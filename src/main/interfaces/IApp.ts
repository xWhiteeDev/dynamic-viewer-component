export type TAppComponents = IAppComponent[]

interface IAppComponent {
    name: string;
    path: string
}
export interface MyModule {
  default: string;
}