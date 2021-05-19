import { FindManyOptions, getRepository } from 'typeorm';
import { IdDto } from '../../common/dtos';
import { ICrudService } from '../../common/services/i-crud.service';
import { NotFoundError } from '../../core/errors';
import { Company } from './company.model';
import { CompanyCreateDto, CompanyListDto, CompanyUpdateDto } from './dtos';

/**
 * Service to make changes to Company resources.
 */
export class CompanyService extends ICrudService<Company> {
  /**
   * Constructor.
   */
  constructor() {
    super('com_');
  }

  /**
   * Company repository.
   */
  get repository() {
    return getRepository(Company);
  }

  /**
   * Create a Company.
   * @param companyCreateDto
   * @returns resource ID
   */
  async create(companyCreateDto: CompanyCreateDto): Promise<string> {
    const result = await this.repository.insert({
      id: this.generateId(),
      ...companyCreateDto,
    });
    return result.identifiers[0].id;
  }

  /**
   * Returns a Company.
   * @param idDto
   * @returns Company or undefined if not found
   */
  async get(idDto: IdDto): Promise<Company | undefined> {
    return this.repository.findOne(idDto.id);
  }

  /**
   * Returns a Company or throw an error if not found.
   * @param idDto
   * @throws {NotFoundError}
   * @returns Company
   */
  async getOrFail(idDto: IdDto): Promise<Company> {
    const result = await this.get(idDto);
    if (typeof result === 'undefined') {
      throw new NotFoundError(`Cannot retrieve Company. ID ${idDto.id} does not exist.`);
    }
    return result;
  }

  /**
   * Update a Company.
   * @param companyUpdateDto DTO containing fields needing update
   * @throws {NotFoundError}
   */
  async update(companyUpdateDto: CompanyUpdateDto): Promise<void> {
    const { id, ...updates } = companyUpdateDto;
    const result = await this.repository.update(id, updates);
    if (result.affected === 0) {
      throw new NotFoundError(`Cannot update Company. ID ${id} does not exist.`);
    }
  }

  /**
   * Delete a Company.
   * @param idDto
   * @throws {NotFoundError}
   */
  async delete(idDto: IdDto): Promise<void> {
    const result = await this.repository.delete(idDto.id);
    if (result.affected === 0) {
      throw new NotFoundError(`Cannot delete Company. ID ${idDto.id} does not exist.`);
    }
  }

  /**
   * List all companies.
   * @param [listDto] parameters and options
   * @returns list of Companies
   */
  async list(listDto?: CompanyListDto): Promise<Company[]> {
    if (!listDto) {
      return this.repository.find();
    }

    const findManyOptions: FindManyOptions<Company> = {};
    const { options, ...filters } = listDto;

    // filters
    findManyOptions.where = filters;

    // pagination
    if (typeof options?.limit !== 'undefined') {
      findManyOptions.take = options?.limit;
      if (typeof options?.page !== 'undefined') {
        findManyOptions.skip = (options?.page - 1) * options?.limit;
      }
    }

    return this.repository.find(findManyOptions);
  }
}

/**
 * Instance of CompanyService.
 */
export const companyService = new CompanyService();
