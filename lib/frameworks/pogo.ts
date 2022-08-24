/* MIT License 

Copyright (c) 2020 Anthony Mancini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */
import { RequestResponseInterface } from "./interface.ts";

export default class PogoRequestResponse implements RequestResponseInterface {
	
	private _request: any;
	protected _response: any;
	
	constructor(request: any, response: any) {
		this._request = request;
		this._response = response;
	}
	
	public getRequestHeader(headerKey: string) : string {
		return this._request.headers[headerKey];
	}
	
	public getResponseHeader(headerKey: string) : string {
		return this._response.headers[headerKey];
	}
	
	public setResponseHeader(headerKey: string, headerValue: string) : void {
		this._response.header(headerKey, headerValue);
	}
	
	public removeResponseHeader(headerKey: string) : void {
		delete this._response.headers[headerKey];
	}
	
	get request() : any {
		return this._request;
	}
	
	get response() : any {
		return this._response;
	}
}