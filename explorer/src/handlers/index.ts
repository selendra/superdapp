/**
 * Subsquid handlers.
 *
 * @module handlers
 */
import { HandlerRegistry } from "./registry";
import { EventHandler, ExtrinsicHandler } from "../interfaces/handler";

import { balancesEventHandlers } from "./balances";
import {
  contractsEventHandlers,
  contractsExtrinsicHandlers,
} from "./contracts";

import { systemEventHandlers } from "./system";


const eventHandlers: Record<string, EventHandler> = {
  ...balancesEventHandlers,
  ...contractsEventHandlers,
  ...systemEventHandlers,
};

const extrinsicHandlers: Record<string, ExtrinsicHandler> =
  contractsExtrinsicHandlers;

/**
 * The handlers registry.
 *
 * Holds extrinsic and event handlers.
 */
export const registry = new HandlerRegistry({
  extrinsicHandlers,
  eventHandlers,
});