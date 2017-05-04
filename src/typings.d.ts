/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare class JustGage {
  constructor(config: object); 
}