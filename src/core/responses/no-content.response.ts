import { Response } from 'express';
import { IOkResponse } from './i-ok.response';
import { ResponseStatusCode } from './i.response';

/**
 * Request was successful, but no content to display.
 */
export class NoContentResponse extends IOkResponse {
  /**
   * Constructor.
   */
  constructor() {
    super(ResponseStatusCode.NO_CONTENT);
  }

  /**
   * @override
   * Does nothing.
   * @returns nothing
   */
  prepare(): void {}

  /**
   * @override
   * Send response back to client.
   * @param res Express Response
   */
  send(res: Response): void {
    res.status(this.status).json(this.prepare());
  }
}
