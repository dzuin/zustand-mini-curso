

const loggerImpl: any = (f, name:any) => (set:any, get:any, store:any) => {

    //type T = ReturnType<typeof f>;

    const loggedSet: typeof set = (...a:any[]) => {
      set(...a)

      console.log("logger.middleware loggerImpl")
      console.log(...(name ? [`${name}:`] : []), get())
    }
    store.setState=loggedSet
   
  
    return f(loggedSet, get, store)
  }

  export const logger = loggerImpl as unknown as any