import * as path from 'path';
import { Builder, By, WebElementPromise } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

jest.setTimeout(60000);

const chromeOptions = new chrome.Options();

chromeOptions.addArguments(
  '--headless=new',
  '--disable-extensions',
  '--disable-gpu',
  '--window-size=470,640'
);

const webDriver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(chromeOptions)
  .build();

afterAll(() => {
  return webDriver.close();
});

class Elements {
  constructor(public elems: Promise<Array<Element>>) {}

  async size(): Promise<number> {
    return (await this.elems).length;
  }

  async click(index: number): Promise<void> {
    return (await this.elems)[index].click();
  }

  async fill(index: number, text: string): Promise<void> {
    return (await this.elems)[index].fill(text);
  }
}

class Element {
  constructor(public elem: WebElementPromise) {}

  async click(): Promise<void> {
    return this.elem.click();
  }

  async fill(text: string, clear: boolean = true): Promise<void> {
    await this.elem.click();

    if (clear) {
      await this.elem.clear();
    }

    await sleep(1);

    for (let i = 0; i < text.length; i++) {
      await this.elem.sendKeys(text.charAt(i));
      await sleep(1);
    }
  }

  isDisplayed(): Promise<boolean> {
    return this.elem.isDisplayed();
  }

  getText(): Promise<string> {
    return this.elem.getText();
  }

  getAttribute(key: string): Promise<string> {
    return this.elem.getAttribute(key);
  }
}

export class Browser {
  static driver = webDriver;

  static go(localPath: string): Promise<void> {
    return Browser.driver.get(
      `file://${path.resolve(__dirname, '..', localPath)}`
    );
  }

  static find(selector: string, index: number = 0): Element {
    return new Element(Browser.driver.findElement(By.css(selector)));
  }

  static findAll(selector: string): Elements {
    return new Elements(
      Browser.driver.findElements(By.css(selector)).then((elems) => {
        return elems.map((elem) => {
          return new Element(
            new WebElementPromise(Browser.driver, Promise.resolve(elem))
          );
        });
      })
    );
  }

  static async waitUntil(
    fn: () => Promise<boolean>,
    timeoutMs: number = 10000,
    intervalMs: number = 500
  ): Promise<void> {
    const startedAt = Date.now();

    while (Date.now() - startedAt < timeoutMs) {
      const result = await fn();

      if (result) {
        return;
      }

      await sleep(intervalMs);
    }

    throw new Error(`waitUntil timed out after ${timeoutMs}ms`);
  }
}