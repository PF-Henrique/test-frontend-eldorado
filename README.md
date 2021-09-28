Conceitos Angulares

imports torna as declarações exportadas de outros módulos disponíveis no módulo atual
declarationssão para disponibilizar diretivas (incluindo componentes e tubos) do módulo atual para outras diretivas no módulo atual. Os seletores de diretivas, componentes ou canais só são comparados com o HTML se forem declarados ou importados.

providers são para tornar serviços e valores conhecidos para DI (injeção de dependência). Eles são adicionados ao escopo raiz e injetados em outros serviços ou diretivas que os possuem como dependência.
Um caso especial providerssão os módulos carregados lentamente que obtêm seu próprio injetor filho. providersde um módulo de carregamento lento são fornecidos apenas para este módulo de carregamento lento por padrão (não o aplicativo inteiro como acontece com outros módulos).

Para obter mais detalhes sobre os módulos, consulte também https://angular.io/docs/ts/latest/guide/ngmodule.html

exportsdisponibiliza os componentes, diretivas e canais em módulos que adicionam este módulo imports. exportstambém pode ser usado para reexportar módulos, como CommonModule e FormsModule, o que geralmente é feito em módulos compartilhados.

entryComponentsregistra componentes para compilação offline para que possam ser usados ​​com ViewContainerRef.createComponent(). Os componentes usados ​​nas configurações do roteador são adicionados implicitamente.
