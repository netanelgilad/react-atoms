import { ReactNode } from "react";

export type Renderable<TProps> = (props: TProps) => ReactNode;
