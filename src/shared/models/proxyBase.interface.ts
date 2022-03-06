export interface ProxyServiceBase {
  /**
   * Fetches all objects existing in the database.
   */
  findAll(): void;

  /**
   *  Searches the database for an object with matching id.
   * @param id The target object's id
   */
  findById(id: string): void;

  /**
   * Creates a new object then persists it to the databse.
   * @param createDto The new object's data
   */
  create(createDto: Record<string, any>): void;

  /**
   * Modifies an existing object then persists it to the database.
   * @param id The target object's id
   * @param updateDto The modified data.
   */
  update(id: string,updateDto: Record<string, any>): void;

  /**
   * Removes an entry from the database.
   * @param id the entry's id.
   */
  delete(id: string): void;

  /**
   * Resets all stores to their default values.
   */
  resetStores(): void;
}
