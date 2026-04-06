# **Introdução**

Ao longo de projetos de migração, principalmente os que envolvem o GoldenGate, percebi que não apenas os DBAs, mas também os coordenadores e gerentes das empresas/instituições desejavam saber se os objetos que estavam sendo replicados estavam ou não sincronizados. Todos sabemos que o GoldenGate é uma ferramenta fantástica, mas eventos externos, sendo eles de infra até APP, podem causar “inconsistências” nos dados.

Assim, percebi que não era uma necessidade isolada em apenas um projeto, mas em vários outros, onde era necessário fornecer relatórios periódicos. Além disso, observei que realizar comparações manualmente com scripts acabava consumindo mais tempo, mesmo eu dominando todos os processos envolvidos.

Com isso em mente, decidi criar o COMPARE, uma ferramenta que visa facilitar o trabalho de DBAs e administradores de GoldenGate, permitindo a realização de comparações de forma mais prática e eficiente. Dessa forma, é possível ter tanto o controle técnico quanto gerencial, facilitando a geração de relatórios para todos os membros do projeto.

### Mas o que é o COMPARE?

O COMPARE é uma ferramenta desenvolvida para comparar dados entre os bancos de origem e destino em projetos de migração, especialmente aqueles baseados no GoldenGate. No entanto, caso você esteja utilizando outro método de migração, o COMPARE também pode ser utilizado para comparar dados em bancos de dados Oracle.

Atualmente, o COMPARE funciona exclusivamente com bancos de dados Oracle na origem e no destino. As arquiteturas validadas até o momento incluem:

*   11G (Enterprise Edition) para 19C (Enterprise Edition)
*   11G (Standard Edition) para 19C (Standard Edition)
*   11G (Standard Edition) para 19C (Enterprise Edition)
*   12.1 (Enterprise Edition) para 19C (Enterprise Edition)
*   12.2 (Enterprise Edition) para 19C (Enterprise Edition)
*   19C (Enterprise Edition) para 23ai
    

> **OBS:** Nas versões Standard, o paralelismo na comparação não está disponível.

### Quais são os tipos de dados que o COMPARE compara?

*   `VARCHAR2`
*   `NUMBER`
*   `DATE`
*   `TIMESTAMP`
*   `CHAR`
*   `NVARCHAR2`
*   `INTEGER`
*   `FLOAT`
*   `RAW`
    

# **Requisitos**

O COMPARE está disponível em uma imagem Docker já previamente configurada. Os requisitos são: 6 GB de RAM, 4 vCPUs e 25 GB de armazenamento.

# **Arquitetura**

A aplicação COMPARE foi desenvolvida com a seguinte estrutura:

*   Banco intermediário  
    Trata-se de um banco de dados interno da aplicação, responsável por centralizar os dados e orquestrar as comparações.
    
    O banco de dados intermediário do COMPARE utiliza a versão Oracle Database 23ai <mark class="bg-yellow-200 dark:bg-yellow-500/30">Free</mark>, garantindo conformidade com os termos de licenciamento e distribuição da Oracle.
    

*   Registros das tabelas de origem e destino  
    As informações das tabelas que serão comparadas são registradas no banco intermediário.
    
*   DBLINKs para processamento remoto  
    Os DBLINKs são utilizados exclusivamente para realizar chamadas remotas aos bancos de origem e destino e obter os resultados das comparações. Nenhum processamento ocorre diretamente no banco intermediário.
    
*   Package PKG\_COMPARACAO\_HASH  
    Essa package é criada nos bancos de origem e destino e é responsável por executar as comparações. Além disso, é possível utilizar o Data Guard tanto na origem quanto no destino para realizar as comparações, garantindo maior flexibilidade.
    

![Imagem da estrutura do COMPARE](https://cdn.hashnode.com/res/hashnode/image/upload/v1735841948094/35e36483-af58-472a-a724-8faae2dba2ab.png?auto=compress,format&format=webp&q=75)

# **Instalação**

A instalação inicial se dará por docker atraves do comando:

### ***Versão 2.0***

Arquitetura Intel/AMD x86\_64

```plaintext
docker create -it --name COMPARE -p 8525:1521 -p 8505:5500 -p 8025:8080 -p 9045:8443 -p 9925:22 gocompare/compare:intel_amd_v2
docker start COMPARE
```

Arquitetura ARM

```plaintext
docker create -it --name COMPARE -p 8525:1521 -p 8505:5500 -p 8025:8080 -p 9045:8443 -p 9925:22 gocompare/compare:arm_v2
docker start COMPARE
```

<mark class="bg-yellow-200 dark:bg-yellow-500/30">PS: Após o primeiro start, aguarde de 10 a 20 minutos para acessar o ambiente. Essa espera ocorre apenas na primeira inicialização, pois é o tempo necessário para que a imagem configure todos os recursos necessários para executar o COMPARE.</mark>

Obs: Só use a versão 1.0 em caso de instabilidade da versão 2.0.

### ***Versão 1.0***

Arquitetura Intel/AMD x86\_64

```plaintext
docker create -it --name COMPARE -p 8525:1521 -p 8505:5500 -p 8025:8080 -p 9045:8443 -p 9925:22 gocompare/compare:intel_amd
docker start COMPARE
```

Arquitetura ARM

```plaintext
docker create -it --name COMPARE -p 8525:1521 -p 8505:5500 -p 8025:8080 -p 9045:8443 -p 9925:22 gocompare/compare:arm
docker start COMPARE
```

<mark class="bg-yellow-200 dark:bg-yellow-500/30">PS: Após o primeiro start, aguarde de 10 a 20 minutos para acessar o ambiente. Essa espera ocorre apenas na primeira inicialização, pois é o tempo necessário para que a imagem configure todos os recursos necessários para executar o COMPARE.</mark>

Uma vez o deploy concluído acessar esta url:

[http://localhost:8025/ords/r/gocompare/compare](http://localhost:8025/ords/r/gocompare/compare)

ou http://<ip\_do\_seu\_server>:8025/ords/r/gocompare/compare

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736281558534/38905760-4981-460a-9051-4037ae970a4a.png?auto=compress,format&format=webp&q=75)

Vamos logar com os seguintes usuários:

**Usuário:** `acesso`  
**Senha:** `Welcome1#_`

Assim que realizar o primeiro login com este usuario a aplicação irá pedir pra resetar, coloque a sua senha.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736281660026/be9d4a66-4749-4307-b8a9-cd5e9951ef2a.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736281677943/0e2c9384-dfbd-406c-8b1c-1709d189d537.png?auto=compress,format&format=webp&q=75)

Primeira tela da aplicação:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736282029829/0c74c4ea-c636-4a3f-a22f-6a0cb03a0b46.png?auto=compress,format&format=webp&q=75)

O primeiro gráfico da tela, no formato de **"torta"**, apresenta uma visão geral do status dos objetos a serem comparados. Ele exibe o total de objetos classificados em três categorias principais:

*   **Synchronized:** Objetos que já foram comparados e estão em conformidade entre os ambientes de origem e destino.
*   **Out of Sync:** Objetos que foram comparados, mas apresentam diferenças entre os ambientes.
*   **Pending:** Objetos que ainda não foram processados para comparação.
    

Esse gráfico fornece uma representação visual clara do progresso e do estado atual da comparação, permitindo identificar rapidamente áreas que necessitam de atenção.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736282516247/f3363fda-01ce-4417-97f2-0adf708eef10.png?auto=compress,format&format=webp&q=75)

Os outros dois gráficos complementam a análise fornecida pelo gráfico de "torta" ao detalhar os objetos **sincronizados** e **dessincronizados**, organizados por **grupos**.

*   **Gráfico de Objetos Sincronizados por Grupos:**  
    Este gráfico apresenta uma visão específica de quais objetos estão sincronizados, separados por grupos. Ele permite identificar rapidamente os grupos com maior conformidade entre os ambientes.
    
*   **Gráfico de Objetos Dessincronizados por Grupos:**  
    Este gráfico destaca os objetos que apresentam diferenças entre os ambientes, também organizados por grupos. Ele é útil para identificar quais grupos necessitam de ação para corrigir inconsistências.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736282536608/ee845928-ebe0-48aa-a7c2-99e553512d1e.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736282555704/d37336e6-add5-4543-b2b4-74d53525e83c.png?auto=compress,format&format=webp&q=75)

Todos os gráficos são **dinâmicos** e possuem integração com a **tela de relatório**, proporcionando uma análise detalhada e interativa. Caso você deseje obter mais informações sobre os objetos **dessincronizados**, basta clicar na seção correspondente do gráfico de interesse. Essa ação redirecionará para o relatório detalhado, exibindo os objetos relacionados, conforme demonstrado no vídeo abaixo.

# **Configuração**

Uma vez concluída a instalação, vamos configurar o sistema de acordo com o seu ambiente.

Antes de começar, é importante explicar como o **COMPARE** funciona.

O primeiro passo será criar a *package* `PKG_COMPARACAO_HASH`, cujo código será apresentado logo abaixo. Essa *package* tem como função calcular os hashes (ou checksums) dos objetos e entregar esses resultados para o **COMPARE**. Em resumo, todo o processamento é realizado nos servidores de origem e destino, por meio da `PKG_COMPARACAO_HASH`, e os dados resultantes são enviados ao **COMPARE**.

O conteúdo da `PKG_COMPARACAO_HASH` é completamente transparente, garantindo segurança e clareza, como você poderá verificar no código.

Uma das grandes vantagens dessa abordagem é que você não precisa usar o ambiente de produção diretamente para realizar a comparação de dados. É possível utilizar o seu **Data Guard**, onde a `PKG_COMPARACAO_HASH` será executada sem problemas, retornando os checksums necessários para a comparação.

Além disso, todas as chamadas à `PKG_COMPARACAO_HASH` são feitas via **DBLink**, garantindo que apenas os checksums sejam transmitidos ao **COMPARE**, minimizando o tráfego de dados entre os ambientes.

1.  Criar a package `PKG_COMPARACAO_HASH` na *ORIGEM* e *DESTINO*.
    

```plaintext
CREATE USER GOCOMPARE IDENTIFIED BY <Sua_senha>;

-- Concessão de privilégios básicos para o usuário
GRANT CONNECT, RESOURCE TO GOCOMPARE;

-- Conceder permissão para executar DBMS_FLASHBACK (utilizado na package)
GRANT EXECUTE ON DBMS_FLASHBACK TO GOCOMPARE;

-- Conceder permissão para executar DBMS_OUTPUT (utilizado para debug)
GRANT EXECUTE ON DBMS_OUTPUT TO GOCOMPARE;

-- Conceder permissão para selecionar dicionários de dados (necessário para views como ALL_TAB_COLUMNS)
GRANT SELECT ANY DICTIONARY TO GOCOMPARE;

-- Conceder permissão para criar e usar DBLinks
GRANT CREATE DATABASE LINK TO GOCOMPARE;

-- Conceder permissão para executar sessões e realizar operações via DBLink
GRANT CREATE SESSION TO GOCOMPARE;

-- Conceder permissões necessárias para funções de SCN e FLASHBACK
GRANT FLASHBACK ANY TABLE TO GOCOMPARE;

-- Conceder permissões para fazer SELECT em qualquer tabela (necessário para a função de hash)
GRANT SELECT ANY TABLE TO GOCOMPARE;



CREATE OR REPLACE PACKAGE GOCOMPARE.PKG_COMPARACAO_HASH IS
    -- Função para gerar o hash de uma tabela
    FUNCTION gerar_hash(
        tabela   IN VARCHAR2, -- Nome da tabela
        usuario  IN VARCHAR2, -- Nome do usuário (owner da tabela)
        parallel IN NUMBER,   -- Grau de paralelismo
        scn      IN NUMBER    -- SCN fixo ou NULL para usar o SCN atual
    ) RETURN NUMBER;
END PKG_COMPARACAO_HASH;
/




CREATE OR REPLACE EDITIONABLE PACKAGE BODY "GOCOMPARE"."PKG_COMPARACAO_HASH" IS
    FUNCTION gerar_hash(
        tabela  IN VARCHAR2,
        usuario IN VARCHAR2,
        parallel IN NUMBER,
        scn IN NUMBER -- SCN é passado como parâmetro
    ) RETURN NUMBER IS
        v_query  CLOB;
        v_result NUMBER := 0;
        v_scn    NUMBER;
    BEGIN
        -- Se o SCN passado for NULL, pega o SCN atual
        IF scn IS NULL THEN
            SELECT DBMS_FLASHBACK.get_system_change_number INTO v_scn FROM dual;
        ELSE
            v_scn := scn;
        END IF;

        -- Inicia a construção da query usando CLOB
        v_query := 'SELECT /*+ FULL(T) PARALLEL(' || parallel || ') */ ' ||
                   'SUM(NVL(ORA_HASH(';

        -- Loop para adicionar colunas manualmente ao CLOB
        FOR r IN (
            SELECT column_name, data_type
            FROM all_tab_columns
            WHERE table_name = UPPER(tabela)
              AND owner = UPPER(usuario)
              AND data_type IN ('VARCHAR2', 'NUMBER', 'DATE', 'TIMESTAMP', 'CHAR', 'NVARCHAR2', 'INTEGER', 'FLOAT', 'RAW')
            ORDER BY column_id
        ) LOOP
            v_query := v_query || 
                CASE 
                    WHEN r.data_type IN ('DATE') THEN 'TO_CHAR(' || r.column_name || ', ''YYYYMMDDHH24MISS'')'
                    WHEN r.data_type IN ('TIMESTAMP') THEN 'TO_CHAR(' || r.column_name || ', ''YYYYMMDDHH24MISSFF'')'
                    WHEN r.data_type IN ('NUMBER') THEN 'TO_CHAR(' || r.column_name || ')'
                    WHEN r.data_type IN ('VARCHAR2', 'CHAR', 'NVARCHAR2') THEN 'TO_CHAR(' || r.column_name || ')'
                    WHEN r.data_type IN ('RAW') THEN 'RAWTOHEX(' || r.column_name || ')' 
                    ELSE 'TO_CHAR(' || r.column_name || ')'
                END || ' || ';
        END LOOP;

        -- Remove o último ' || ' extra e finaliza a query
        v_query := RTRIM(v_query, ' || ') || '),2)) ' ||
                   'INTO :result FROM ' || usuario || '.' || tabela || ' AS OF SCN ' || v_scn || ' T';

        -- Executa a consulta e obtém o hash
        EXECUTE IMMEDIATE v_query INTO v_result;

        -- Verifica se v_result é NULL e retorna 77777777 no caso
        IF v_result IS NULL THEN
            RETURN 77777777;
        END IF;

        RETURN v_result;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 77777777;  -- Nenhuma dado encontrado, retorna 77777777
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('Erro ao gerar ou executar a consulta: ' || SQLERRM);
            RETURN NULL; -- Em caso de erro, retorna NULL
    END gerar_hash;

END pkg_comparacao_hash;
/
```

Uma vez criado o usuário `GOCOMPARE` e a *package*, o próximo passo é acessar a aplicação.

Se você optar por usar o **Data Guard** para a comparação, será necessário apontar para o host correto. Além disso, é imprescindível criar um **DBLink** para o banco de dados de destino. Para isso, utilize as credenciais do usuário `GOCOMPARE`, que você configurou no script anterior.

No exemplo abaixo, foi criado um **DBLink** para a base de origem chamado `ORIGEM19C` e outro para a base de destino chamado `DESTINO23AI`. Esses DBLinks são essenciais para que a aplicação consiga se comunicar com os bancos de dados envolvidos no processo de comparação.

Em administração, vamos criar os dblinks

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736541645867/264973bd-f4ba-42dd-bd6f-029d4fc9eed1.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736365968146/32b2aec3-2aef-4b06-b5fe-43012d33bfda.png?auto=compress,format&format=webp&q=75)

Nesta tela, você pode **criar**, **deletar** e **testar** os **DBLinks** de forma prática.

Após criar um **DBLink**, vá até a seção de **testes de DBLink**. Selecione o **DBLink** recém-criado e inicie o teste para garantir que ele está funcionando corretamente.

Essa funcionalidade ajuda a verificar a conectividade entre os bancos de dados antes de prosseguir com os demais processos, garantindo que os **DBLinks** estejam configurados adequadamente.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736366034036/ffa1359e-e361-4c1c-a48f-28eb3c520b3a.png?auto=compress,format&format=webp&q=75)

Se tudo ocorrer conforme esperado, será exibida uma mensagem de sucesso indicando que o **DBLink** foi testado com êxito.

Caso haja algum problema durante o teste, uma mensagem de erro será exibida, detalhando o motivo da falha.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736366050425/abaf3a9a-2f93-4644-ad07-d9fb37a83eb3.png?auto=compress,format&format=webp&q=75)

Agora que a *package* foi criada e os **DBLinks** para os bancos de dados de origem e destino (`ORIGEM19C` e `DESTINO23AI`) também foram configurados com sucesso, podemos prosseguir com o carregamento da **tabela de controle**.

Essa tabela será utilizada para armazenar os *owners* do ambiente de produção e outros dados necessários para a comparação. Durante o processo de carregamento, os seguintes usuários padrão do Oracle são excluídos automaticamente, garantindo que apenas os dados relevantes sejam inseridos na tabela de controle:

*   SYS
*   SYSTEM
*   LBACSYS
*   DVSYS
*   OUTLN
*   XDB
*   CTXSYS
*   DBSNMP
*   ORDSYS
*   MDSYS
*   OLAPSYS
*   WMSYS
*   ORDDATA
*   ORDPLUGINS
*   SI\_INFORMTN\_SCHEMA
*   SYSMAN
*   FLOWS\_FILES
*   APEX\_040000
*   APEX\_050000
*   APPQOSSYS
*   DBSFWUSER
*   APEX\_030200
*   OWBSYS
*   OJVMSYS
*   AUDSYS
*   HR
*   OE
*   SH
*   SCOTT
*   IX
*   EXFSYS
    

Sem delongas, vamos fazer a primeira carga:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736538987500/830f409d-8ef9-4413-9bac-1e4e55a6d915.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736539071685/ce546f75-feae-4423-841b-4dd7b0552ed8.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736367285386/2a5f4f58-1c94-4389-8bcd-8eb04f7fa63e.png?auto=compress,format&format=webp&q=75)

**Observação:** O COMPARE irá obter apenas os nomes dos owners/tabelas; nenhum dado será transferido para o banco de dados do COMPARE.

Apos o procedimento concluir, ir até o menu COMPARAÇÃO > RELATORIOS SIMPLES OU DETALHADO.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736371970930/d65ce7e9-25c4-40fb-9784-8fbf1d680b79.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736372806012/4a680342-ecbd-4afd-a83e-00201f8c2b23.png?auto=compress,format&format=webp&q=75)

Por padrão, o campo STATUS COMPARAÇÃO tem o valor 'PENDING' e o campo GRUPO tem o valor 'GRUPO1'.

Se o seu banco de dados for relativamente pequeno e você quiser realizar a comparação de todos os dados de uma vez, pode avançar diretamente para o capítulo sobre comparação. Caso contrário, é recomendável separar os dados em grupos.

**Por que separar os grupos?**

Durante uma migração com o GoldenGate, por exemplo, é comum trabalhar com múltiplos grupos. Imagine que a tabela `APP.SALARIO` esteja em um replicat e a tabela `APP.ARQUIVOS` em outro — isso significa que elas provavelmente estarão associadas a SCNs diferentes. Além disso, se você estiver lidando com uma tabela muito grande, como uma de 1 TB, pode ser interessante tratá-la separadamente para evitar uma comparação que exija recursos excessivos.

Em resumo, separação em grupos permite organizar o processo de acordo com suas necessidades, tornando-o mais eficiente e adaptado às características específicas do seu ambiente.

**Como separar os grupos?**

1.  Acesse o menu: **Administração > Ajustes de grupo**.
2.  Na tela **Prompt**, insira o comando `UPDATE` no formato especificado.
    

#### **Exemplo**

Se você deseja separar os registros com base nos replicats, utilize o seguinte comando `UPDATE`:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736539219274/dca4fb93-b863-4919-9119-42845f87560d.png?auto=compress,format&format=webp&q=75)

**Observação**: Não utilize `;` no final do comando inserido no prompt.

Ao clicar em **Atualizar**, a seguinte mensagem será exibida:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736539319772/1e10afd8-4c2b-45f0-85e7-f8f972985cee.png?auto=compress,format&format=webp&q=75)

Agora, acesse **Comparações > Relatórios > Relatórios Simples**.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736539388537/74d48c02-0c66-40c7-9a50-e965836aaf3a.png?auto=compress,format&format=webp&q=75)

Os grupos foram atualizados com base no comando `UPDATE` executado.

No menu **Ajuste de Grupo**, você também pode remover owners ou tabelas indesejadas, como owners internos do Oracle ou tabelas que não precisam ser comparadas.

#### **Exemplo:**

Removendo o owner `GSMADMIN_INTERNAL`, incluído no setup inicial do Oracle:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736539772989/66a5df96-0647-45e4-b9c5-bbb22b082b75.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736539948567/27053686-1b30-4389-b605-17dd1576034b.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736539965276/02bdb674-f56f-454f-a642-a0b5ad1750c6.png?auto=compress,format&format=webp&q=75)

Pronto! Esse owner não aparecerá mais na tela de relatórios.

Você pode usar essa funcionalidade para remover owners internos do Oracle incluídos no setup inicial ou qualquer outro owner que deseje excluir do processo de comparação.

# **Comparação**

### **Comparação Detalhada**

Agora que concluímos todos os pré-requisitos e configuramos o COMPARE conforme as especificidades do nosso ambiente, podemos avançar para a etapa de comparação.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736620976175/2968816e-82cb-4840-a07c-2138bf54ef4b.png?auto=compress,format&format=webp&q=75)

Conforme observado acima, o Dashboard principal exibe todos os itens com o status "PENDING". Isso ocorre porque ainda não iniciamos nenhuma comparação. Então, vamos começar!

Acesse: **Comparações > Executar Comparação > Comparação Detalhada**.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736621256192/273af5ca-4ba3-4837-a233-0f0a2d5f0887.png?auto=compress,format&format=webp&q=75)

Na comparação detalhada vamos escolher o grupo R\_OT.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736621936249/09eee0ef-eefd-48c4-8132-77be2a3d5520.png?auto=compress,format&format=webp&q=75)

Vamos entender melhor os conceitos de **SCN Origem** e **SCN Destino**.

1.  **SCN Origem**:  
    Para preenchê-lo, você deve:
    
    *   Pausar o replicat **"R\_OT"**.
    *   Capturar o último SCN aplicado usando o comando: `info replicat XX detail`.
    *   Preencher o campo **SCN\_ORIGEM** com o valor obtido.
        
2.  **SCN Destino**:
    
    *   **Se o replicat permanecer pausado durante toda a comparação**, **não será necessário preencher o campo SCN\_DESTINO** com o SCN da base destino.
    *   **Se o replicat for retomado após a pausa**, é essencial preencher o campo **SCN\_DESTINO** com o SCN da base destino capturado **antes de reiniciar o replicat**.
        

Após a comparação do primeiro grupo, já é possível observar que o gráfico começou a apresentar alguns dados relevantes.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736621411542/2505b1a2-0603-4e47-adc7-ad9b90223731.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736621436721/5c91d9b4-0780-45ce-bb3a-5ac5367740a3.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736621448315/8baa7481-0c52-48dd-a1cc-57af1143e727.png?auto=compress,format&format=webp&q=75)

Após a comparação, identificamos que 30 objetos estão sincronizados e 8 estão dessincronizados.

Em seguida, realizarei a comparação dos demais grupos para demonstrar como o gráfico será exibido.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737309031853/ebe8f4c4-6e80-4e12-b947-65f9bfab5bf1.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737309345179/13a923a6-bc24-4468-b48e-85bc6f00679a.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737309362663/87eeb192-713c-4419-895f-60d654d99ff6.png?auto=compress,format&format=webp&q=75)

### **Comparação Full**

Esta comparação será realizada para todos os grupos, sem distinções, abrangendo todas as tabelas listadas na tabela de comparação. Apenas três atributos serão considerados durante a comparação completa: **PARALLEL**, **SCN ORIGEM** e **SCN DESTINO**.

Uma vez iniciada, todos os objetos serão comparados.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736893190870/044ea1e8-d73a-4245-8b77-67d73edf58d5.png?auto=compress,format&format=webp&q=75)

A seguir, será realizada uma comparação completa (FULL) de uma base que está sendo replicada utilizando o Oracle GoldenGate. Para isso, apresentamos as informações detalhadas utilizando o comando `INFO ALL`

```plaintext
GGSCI (777bca39a994) 1> info all 

Program     Status      Group       Lag at Chkpt  Time Since Chkpt

MANAGER     RUNNING                                           
EXTRACT     RUNNING     E_APP       00:00:00      00:00:01    
REPLICAT    RUNNING     R_CL        00:00:00      00:00:05    
REPLICAT    RUNNING     R_FN        00:00:00      00:00:05    
REPLICAT    RUNNING     R_FS        00:00:00      00:00:01    
REPLICAT    RUNNING     R_JD        00:00:00      00:00:08    
REPLICAT    RUNNING     R_LG        00:00:00      00:00:02    
REPLICAT    RUNNING     R_MT        00:00:00      00:00:04    
REPLICAT    RUNNING     R_OT        00:00:00      00:00:07    
REPLICAT    RUNNING     R_PL        00:00:00      00:00:04    
REPLICAT    RUNNING     R_PR        00:00:00      00:00:04    
REPLICAT    RUNNING     R_RH        00:00:00      00:00:08    
REPLICAT    RUNNING     R_TR        00:00:00      00:00:01    
REPLICAT    RUNNING     R_VE        00:00:00      00:00:09    


GGSCI (777bca39a994) 2> 
```

Para assegurar que todos os replicats estejam devidamente sincronizados, será interrompido apenas o processo de extract, aguardando alguns minutos para a estabilização do ambiente.

```plaintext
GGSCI (777bca39a994) 2> stop E_APP

Sending STOP request to EXTRACT E_APP ...
Request processed.


GGSCI (777bca39a994) 3> info E_APP 

EXTRACT    E_APP     Last Started 2025-01-13 18:40   Status STOPPED
Checkpoint Lag       00:00:00 (updated 00:00:09 ago)
Log Read Checkpoint  Oracle Integrated Redo Logs
                     2025-01-14 22:22:29
                     SCN 0.9735337 (9735337)


GGSCI (777bca39a994) 4> 
```

Após interromper o processo de Extract, o último SCN processado foi 9735337. Isso indica que nenhum replicat aplicará alterações além desse SCN (9735337).

```plaintext
GGSCI (777bca39a994) 4> info all ;

Program     Status      Group       Lag at Chkpt  Time Since Chkpt

MANAGER     RUNNING                                           
EXTRACT     STOPPED     E_APP       00:00:00      00:01:30    
REPLICAT    RUNNING     R_CL        00:00:00      00:00:02    
REPLICAT    RUNNING     R_FN        00:00:00      00:00:02    
REPLICAT    RUNNING     R_FS        00:00:00      00:00:07    
REPLICAT    RUNNING     R_JD        00:00:00      00:00:05    
REPLICAT    RUNNING     R_LG        00:00:00      00:00:08    
REPLICAT    RUNNING     R_MT        00:00:00      00:00:00    
REPLICAT    RUNNING     R_OT        00:00:00      00:00:04    
REPLICAT    RUNNING     R_PL        00:00:00      00:00:01    
REPLICAT    RUNNING     R_PR        00:00:00      00:00:00    
REPLICAT    RUNNING     R_RH        00:00:00      00:00:05    
REPLICAT    RUNNING     R_TR        00:00:00      00:00:08    
REPLICAT    RUNNING     R_VE        00:00:00      00:00:05   
```

Agora vou executar uma comparação completa, só que não quero deixar o extract parado. O SCN de origem eu já tenho, que é 9735337. Agora vou obter o SCN que está no momento na base de destino.

```plaintext
root@compare:~# destino

SQL*Plus: Release 23.0.0.0.0 - Production on Tue Jan 14 22:26:31 2025
Version 23.5.0.24.07

Copyright (c) 1982, 2024, Oracle.  All rights reserved.


Connected to:
Oracle Database 23ai Free Release 23.0.0.0.0 - Develop, Learn, and Run for Free
Version 23.5.0.24.07

SQL> select current_scn from v$database ;

CURRENT_SCN
-----------
    9832828
```

Pronto, temos as seguintes informações:

SCN ORIGEM: 9735337 (obtido do `info E_APP` )

SCN DESTINO: 9832828 (obtido `select current_scn from v$database` )

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736893786859/f02dba2b-65a8-4b53-8719-b3c3012ad4fe.png?auto=compress,format&format=webp&q=75)

Para realizar a comparação completa (FULL), utilizaremos paralelismo com 4 threads (parallel 4).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736893827101/83e4143b-2459-4cba-9941-d8ba20a0fc7f.png?auto=compress,format&format=webp&q=75)

Agora que iniciamos o job, podemos volta o extract novamente:

```plaintext

GGSCI (777bca39a994) 5> start E_APP

Sending START request to MANAGER ...
EXTRACT E_APP starting


GGSCI (777bca39a994) 6> info all 

Program     Status      Group       Lag at Chkpt  Time Since Chkpt

MANAGER     RUNNING                                           
EXTRACT     RUNNING     E_APP       00:00:00      00:11:35    
REPLICAT    RUNNING     R_CL        00:00:00      00:00:05    
REPLICAT    RUNNING     R_FN        00:00:00      00:00:05    
REPLICAT    RUNNING     R_FS        00:00:00      00:00:01    
REPLICAT    RUNNING     R_JD        00:00:00      00:00:09    
REPLICAT    RUNNING     R_LG        00:00:00      00:00:02    
REPLICAT    RUNNING     R_MT        00:00:00      00:00:04    
REPLICAT    RUNNING     R_OT        00:00:00      00:00:07    
REPLICAT    RUNNING     R_PL        00:00:00      00:00:04    
REPLICAT    RUNNING     R_PR        00:00:00      00:00:04    
REPLICAT    RUNNING     R_RH        00:00:00      00:00:09    
REPLICAT    RUNNING     R_TR        00:00:00      00:00:01    
REPLICAT    RUNNING     R_VE        00:00:00      00:00:09    
```

A comparação está fixada pelo SCN, garantindo que, mesmo que o extract seja iniciado posteriormente, as transações retroativas não causarão status dessincronizado nos objetos. O mesmo processo aplicado ao Extract pode ser utilizado para o Replicat: basta pausá-lo, coletar o último SCN aplicado, obter o SCN da base de destino e, em seguida, iniciar a comparação detalhada.

A Comparação FULL, concluiu, agora podemos ver os quem está ou não sincronizado.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737309494781/f1faef28-c48c-4a05-bda3-f36f8cbb09ba.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737309504617/4827bf37-5b35-43d4-b313-cc64d8b0a274.png?auto=compress,format&format=webp&q=75)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737309512134/15baccec-c8a0-47cb-bd10-4383aafd749a.png?auto=compress,format&format=webp&q=75)

Podemos ver que o grupo que tem mais dessincronizados é o grupo R\_OT, vamos clicar na barra laranja pra ver os objetos.

# **Analise de objetos dessincronizados.**

Quando o checksum da origem diverge do destino, significa que o objeto está, de fato, dessincronizado. No entanto, existem alguns fatores que podem indicar dessincronização. Abaixo, vamos analisar o caso específico da tabela `SAMPLE_TABLE`.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737309658667/90797697-d4ac-4d31-8e1d-41edf72a2794.png?auto=compress,format&format=webp&q=75)

Como podemos observar, a tabela `SAMPLE_TABLE` existe apenas no banco de origem e não no destino. O processo de verificação é unidirecional e não automático, sendo executado apenas durante o **setup inicial**. Ele analisa exclusivamente se uma tabela existente na origem também está presente no destino, notificando a ausência apenas quando a tabela está ausente no destino. No entanto, o processo não verifica se há tabelas no destino que não estejam na origem. Essa lógica é aplicada integralmente no **setup inicial**.

Caso a tabela não exista no destino durante o **setup inicial**, será registrada uma observação no campo `OBS`, indicando que a tabela não existe no destino. Além disso, essa ausência pode ser identificada por meio do campo `CHECKSUM`, que permanecerá vazio em dois cenários:

1.  **Tabela Inexistente:** A tabela está presente na origem, mas não no destino.
2.  **Tempo de Undo Retention Insuficiente:** O período configurado para `UNDO_RETENTION` foi insuficiente para concluir a comparação.
    

O processo de comparação utiliza o **SCN** (System Change Number). Caso a duração da comparação ultrapasse o tempo configurado para `UNDO_RETENTION`, será gerado o erro `"ORA-01555: snapshot too old"` e o processo será abortado. Por exemplo, se a comparação durar mais de 20 minutos e o `UNDO_RETENTION` estiver configurado para apenas 20 minutos, a comparação será abortada.

Por fim, a observação no campo `OBS` indicando que a tabela não existe no destino será registrada na tabela de relatório apenas se essa condição for detectada já no **setup inicial**. Se a tabela for removida após essa etapa, essa ausência será refletida apenas pelo campo `CHECKSUM` vazio.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737311860423/8e166fcc-ace4-40a1-80f6-58fa1327449b.png?auto=compress,format&format=webp&q=75)

Também pode ocorrer a situação de tabelas vazias. Por exemplo, se a tabela existir, mas a quantidade de registros for 0, o `CHECKSUM` retornará o valor `77777777`, indicando que a tabela está 'vazia'.

# **JOBS**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737313275052/3afd98c3-dfdc-4015-8c92-ff4e6ba4676e.png?auto=compress,format&format=webp&q=75)

O campo **Jobs** no menu **Administração** é utilizado para acompanhar a duração de execução de cada grupo ou de uma comparação total. Além disso, ele permite cancelar uma comparação caso ela sobrecarregue a base de origem ou destino.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1738086601315/0365f62c-9287-4a05-a457-3bc45baf2446.png?auto=compress,format&format=webp&q=75)

# **Limitações de Responsabilidade**

O **COMPARE** foi desenvolvido com uma estrutura que preza pela confiabilidade e pela confiança no usuário que executa a ferramenta. Embora os resultados possam ser ajustados manualmente, reforçamos que a ferramenta passou por diversos testes e demonstrou sua eficácia em diferentes cenários. No entanto, é importante destacar que o **COMPARE** não se responsabiliza pelos resultados em nenhum cenário, uma vez que pode haver intervenções humanas ou manipulações nos dados gerados. Durante a utilização, você poderá observar na prática a confiabilidade do **COMPARE**, desde que seja utilizado de maneira adequada e alinhado às boas práticas recomendadas.