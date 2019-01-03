//

export class Config {
  public filename = "todo.txt";
  public path =
    process.env.XDG_LOCAL_DIR ||
    process.env.XDG_CONFIG_HOME ||
    process.env.HOME;
}
