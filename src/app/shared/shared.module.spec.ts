import { ComponentsModule } from './shared.module';

describe('ComponentsModule', () => {
  let componentsModule: ComponentsModule;

  beforeEach(() => {
    componentsModule = new ComponentsModule();
  });

  it('should create an instance', () => {
    expect(componentsModule).toBeTruthy();
  });
});
